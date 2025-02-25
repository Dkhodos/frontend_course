import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormArray,
  ValidationErrors,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PassengerStepComponent } from './steps/passenger-step/passenger-step.component';
import { BaggageStepComponent } from './steps/baggage-step/baggage-step.component';
import { SeatsStepComponent } from './steps/seats-step/seats-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import { FlightInformationComponent } from './components/flight-information/flight-information';
import Passenger from '../../../models/passenger.model';
import { FlightBookForm } from './flight-book.component.types';
import { SeatSummaryItem } from './steps/seats-step/components/seat-selector/seat-selector.types';
import { Booking } from '../../../models/booking.model';
import { BookingsService } from '../../../services/bookings.service';
import { ToastService } from '../../../components/toast/toast.service';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'ono-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    NotFoundPlaceholderComponent,
    ReactiveFormsModule,
    LoaderComponent,
    MatStepperModule,
    PassengerStepComponent,
    BaggageStepComponent,
    SeatsStepComponent,
    SummaryStepComponent,
    FlightInformationComponent,
  ],
})
export class FlightBookComponent implements OnInit {
  flight = signal<Flight | null>(null);
  isLoading = signal<boolean>(true);

  form: FormGroup<FlightBookForm>;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private fb: FormBuilder,
    private bookingsService: BookingsService,
    private toastService: ToastService,
    private urlService: UrlService,
    private router: Router
  ) {
    this.form = this.fb.group<FlightBookForm>({
      passengers: this.fb.array<FormGroup<PassengerForm>>(
        [],
        this.minPassengersValidator
      ),
      seats: this.fb.nonNullable.control<SeatSummaryItem[]>([]),
    });

    this.addInitialPassenger();
  }

  // Adds a default passenger form group to the FormArray
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

  // Validator to ensure at least one passenger is present
  minPassengersValidator(control: AbstractControl): ValidationErrors | null {
    const arr = control as FormArray;
    return arr.length > 0
      ? null
      : { minPassengers: 'At least one passenger is required' };
  }

  async ngOnInit(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');

    if (flightId) {
      try {
        const fetchedFlight = await this.flightsService.get(flightId);
        this.flight.set(fetchedFlight);
      } catch (error) {
        console.error('❌ Error fetching flight:', error);
      }
    }
    this.isLoading.set(false);
  }

  // Fix: Update getter to read the correct control keys and combine first/last name
  get passengersState(): Passenger[] {
    const passengersArray = this.form.get('passengers') as FormArray;
    const seatSummary = this.seatSummary; // Fetch selected seats

    return passengersArray.controls.map((control) => {
      const passportId = control.get('passportId')?.value;
      const firstName = control.get('firstName')?.value;
      const lastName = control.get('lastName')?.value;

      // Find the seat assigned to this passenger
      const seat =
        seatSummary.find((seat) => seat.passportNumber === passportId)
          ?.seatId || 'auto-assigned';

      return new Passenger(`${firstName} ${lastName}`, passportId, seat);
    });
  }

  get seatSummary(): SeatSummaryItem[] {
    return this.form.get('seats')?.value || [];
  }

  async onBook(): Promise<void> {
    if (!this.flight()) return;

    const totalExtraCost = this.seatSummary.reduce(
      (sum, item) => sum + item.extraCost,
      0
    );
    const finalPrice = this.flight()!.price + totalExtraCost;

    // Create a new Booking with computed final price.
    const booking = new Booking(
      this.flight()!.flightNumber,
      this.passengersState,
      finalPrice
    );

    try {
      await this.bookingsService.add(booking);
      this.toastService.add({
        id: 'booking-success',
        title: 'Booking Successful',
        variant: 'success',
        description: 'Your booking has been successfully added.',
      });
      await this.router.navigate(this.urlService.getMyBookingsURL());
    } catch (error) {
      console.error(error);
      this.toastService.add({
        id: 'booking-error',
        title: 'Booking Failed',
        variant: 'error',
        description: 'An error occurred while booking the flight.',
      });
    }
  }
}
