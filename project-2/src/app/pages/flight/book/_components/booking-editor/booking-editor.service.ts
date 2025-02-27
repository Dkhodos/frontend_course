import { Injectable } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FlightBookForm } from './booking-editor.component.types';
import { Booking } from '../../../../../models/booking.model';
import { Flight } from '../../../../../models/flight.model';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import {
  SeatSectionType,
  SeatSummaryItem,
} from './steps/seats-step/components/seat-selector/seat-selector.types';
import { SingleBaggageSummary } from './steps/baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';
import { AUTO_ASSIGNED_PLACE } from './booking-editor.consts';
import Passenger from '../../../../../models/passenger.model';
import {
  PREFIX_TO_SEAT_TYPE,
  SEAT_TYPE_TO_EXTRA_COST,
} from './steps/seats-step/components/seat-selector/seat-selector.consts';

@Injectable({
  providedIn: 'root',
})
export class BookingEditorService {
  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the booking form based on the provided initial booking state and flight.
   */
  initializeBookingState(
    initialState: Booking,
    flight: Flight,
    form: FormGroup<FlightBookForm>
  ): void {
    // Clear any pre-existing passenger form groups.
    this.clearPassengers(form);

    const seats: Record<string, SeatSummaryItem> = {};
    const baggage: Record<string, SingleBaggageSummary> = {};

    initialState.passengers.forEach((passenger) => {
      // Split the full name into first and last names.
      const { firstName, lastName } = this.splitName(passenger.name);

      // Create the passenger form group.
      const passengerGroup = this.fb.group<PassengerForm>({
        firstName: this.fb.control(firstName, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        lastName: this.fb.control(lastName, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        passportId: this.fb.control(passenger.passportNumber, {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
        }),
      });
      (form.get('passengers') as FormArray).push(passengerGroup);

      // Handle seat assignment.
      if (
        passenger.seatNumber &&
        passenger.seatNumber !== AUTO_ASSIGNED_PLACE
      ) {
        seats[passenger.passportNumber] =
          this.computeSeatSummaryItemForPassenger(
            passenger,
            passenger.seatNumber
          );
      } else {
        // If no seat provided, assign the auto placeholder.
        seats[passenger.passportNumber] = {
          passengerName: passenger.name,
          passportNumber: passenger.passportNumber,
          seatId: AUTO_ASSIGNED_PLACE,
          seatType: SeatSectionType.Economy,
          extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Economy],
        };
      }

      // Setup baggage info.
      baggage[passenger.passportNumber] = {
        items: passenger.baggage || [],
        itemsExplain: '',
        price: 0,
        passengerName: passenger.name,
        passportNumber: passenger.passportNumber,
      };
    });

    // Update the form controls.
    form.get('seats')?.setValue(seats);
    form.get('baggage')?.setValue(baggage);
  }

  /**
   * Clears all passenger form groups from the FormArray.
   */
  private clearPassengers(form: FormGroup<FlightBookForm>): void {
    const passengersArray = form.get('passengers') as FormArray;
    while (passengersArray.length) {
      passengersArray.removeAt(0);
    }
  }

  /**
   * Splits a full name into first and last names.
   */
  private splitName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(' ');
    return {
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
    };
  }

  private computeSeatSummaryItemForPassenger(
    passenger: Passenger,
    seatId: string
  ): SeatSummaryItem {
    const prefixMatch = seatId.match(/^[A-Za-z]+/);
    let seatType: SeatSectionType = SeatSectionType.Economy;
    if (prefixMatch) {
      const prefix = prefixMatch[0];
      seatType = PREFIX_TO_SEAT_TYPE[prefix] || SeatSectionType.Economy;
    }
    return {
      passengerName: passenger.name,
      passportNumber: passenger.passportNumber,
      seatId,
      seatType,
      extraCost: SEAT_TYPE_TO_EXTRA_COST[seatType],
    };
  }
}
