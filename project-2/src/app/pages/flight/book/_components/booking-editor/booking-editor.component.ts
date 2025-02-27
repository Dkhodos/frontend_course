import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../../../models/flight.model';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormArray,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { PassengerStepComponent } from './steps/passenger-step/passenger-step.component';
import { BaggageStepComponent } from './steps/baggage-step/baggage-step.component';
import { SeatsStepComponent } from './steps/seats-step/seats-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { FlightInformationComponent } from './components/flight-information/flight-information';
import { Booking } from '../../../../../models/booking.model';
import { BaggageForm, FlightBookForm } from './booking-editor.component.types';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import { SeatSummaryItem } from './steps/seats-step/components/seat-selector/seat-selector.types';
import Passenger from '../../../../../models/passenger.model';
import { SingleBaggageSummary } from './steps/baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';
import { AUTO_ASSIGNED_PLACE } from './booking-editor.consts';
import { BookingEditorService } from './booking-editor.service';

@Component({
  selector: 'ono-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    PassengerStepComponent,
    BaggageStepComponent,
    SeatsStepComponent,
    SummaryStepComponent,
    FlightInformationComponent,
  ],
})
export class BookingEditorComponent implements OnInit {
  @Input() flight!: Flight;
  @Input() initialState: Booking | undefined;
  @Output() save = new EventEmitter<Booking>();

  form: FormGroup<FlightBookForm>;

  constructor(
    private fb: FormBuilder,
    private bookingEditorService: BookingEditorService
  ) {
    this.form = this.fb.group<FlightBookForm>({
      passengers: this.fb.array<FormGroup<PassengerForm>>(
        [],
        this.minPassengersValidator
      ),
      seats: this.fb.nonNullable.control<Record<string, SeatSummaryItem>>({}),
      baggage: this.fb.nonNullable.control<BaggageForm>({}),
    });
  }

  ngOnInit(): void {
    if (this.initialState) {
      this.handleInitialState();
    } else {
      this.addInitialPassenger();
    }
  }

  private addInitialPassenger(): void {
    const passengerGroup = this.fb.group<PassengerForm>({
      firstName: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      passportId: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
      }),
    });
    (this.form.get('passengers') as FormArray).push(passengerGroup);
  }

  private handleInitialState(): void {
    this.bookingEditorService.initializeBookingState(
      this.initialState!,
      this.flight,
      this.form
    );
  }

  // Validator to ensure at least one passenger is present
  minPassengersValidator(control: AbstractControl): ValidationErrors | null {
    const arr = control as FormArray;
    return arr.length > 0
      ? null
      : { minPassengers: 'At least one passenger is required' };
  }

  // Fix: Update getter to read the correct control keys and combine first/last name
  get passengersState(): Passenger[] {
    const passengersArray = this.form.get('passengers') as FormArray;

    return passengersArray.controls.map((control) => {
      const passportId = control.get('passportId')?.value;
      const firstName = control.get('firstName')?.value;
      const lastName = control.get('lastName')?.value;

      // Find the seat assigned to this passenger
      const seats = this.form.get('seats')?.value ?? {};
      const baggage = this.form.get('baggage')?.value ?? {};

      return new Passenger(
        `${firstName} ${lastName}`,
        passportId,
        seats?.[passportId]?.seatId ?? AUTO_ASSIGNED_PLACE,
        baggage?.[passportId]?.items ?? []
      );
    });
  }

  get seatSummary(): SeatSummaryItem[] {
    const seats = this.form.get('seats')?.value || {};
    return Object.values(seats);
  }

  get baggageSummary(): SingleBaggageSummary[] {
    const baggage = this.form.get('baggage')?.value || {};
    return Object.values(baggage);
  }

  async onBook({ discount }: { discount: number }): Promise<void> {
    if (!this.flight) return;

    const totalExtraCost = this.seatSummary.reduce(
      (sum, item) => sum + item.extraCost,
      0
    );
    let finalPrice = this.flight!.price + totalExtraCost;
    if (discount > 0) {
      finalPrice -= finalPrice * discount;
    }

    const booking = new Booking(
      this.flight!.flightNumber,
      this.passengersState,
      finalPrice
    );

    this.save.emit(booking);
  }
}
