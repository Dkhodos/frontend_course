import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../../../models/flight.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { PassengerStepComponent } from './steps/passenger-step/passenger-step.component';
import { BaggageStepComponent } from './steps/baggage-step/baggage-step.component';
import { SeatsStepComponent } from './steps/seats-step/seats-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { FlightInformationComponent } from './components/flight-information/flight-information';
import { Booking } from '../../../../../models/booking.model';
import { BookingFormService } from './services/booking-form.service';
import { CouponType } from '../../../../../models/coupon.model';

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

  constructor(private bookingFormService: BookingFormService) {}

  ngOnInit() {
    if (this.initialState) {
      this.bookingFormService.addBooking(this.initialState);
    }
  }

  get form() {
    return this.bookingFormService.bookingForm;
  }

  public onBook(price: number) {
    this.save.emit(this.bookingFormService.toBooking(this.flight, price));
  }
}
