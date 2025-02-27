import { Injectable, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SingleBaggageSummary } from '../steps/baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';
import { BAGGAGE_TYPE_TO_DESCRIPTION } from '../steps/baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.const';
import Passenger, { Baggage } from '../../../../../../models/passenger.model';
import { Booking } from '../../../../../../models/booking.model';
import {
  SeatSectionType,
  SeatSummaryState,
} from '../steps/seats-step/components/seat-selector/seat-selector.types';
import {
  PREFIX_TO_SEAT_TYPE,
  SEAT_TYPE_TO_EXTRA_COST,
} from '../steps/seats-step/components/seat-selector/seat-selector.consts';
import { AUTO_ASSIGNED_PLACE } from '../booking-editor.consts';
import { Flight } from '../../../../../../models/flight.model';
import { uniquePassportIdValidator } from '../validators/uniquePassportIdValidator';

export interface BookingFormPassenger {
  firstName: string;
  lastName: string;
  passportId: string;
  seat: string;
  baggage: string[];
}

export interface BookingForm {
  passengers: BookingFormPassenger[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingFormService {
  // Central booking form used across all steps
  bookingForm: FormGroup;
  currentPassengerBaggageId = signal<string | null>(null);
  currentPassengerSeatsId = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      passengers: this.fb.array([]),
    });
  }

  // Expose the passengers FormArray
  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  // Create a new FormGroup for a passenger with built-in validators.
  private createPassenger(
    passengerData?: Partial<BookingFormPassenger>
  ): FormGroup {
    return this.fb.group({
      firstName: [passengerData?.firstName || '', Validators.required],
      lastName: [passengerData?.lastName || '', Validators.required],
      passportId: [
        passengerData?.passportId || '',
        [Validators.required, Validators.pattern(/^\d{8}$/)],
      ],
      seat: [passengerData?.seat || '', Validators.required],
      baggage: [passengerData?.baggage || []],
    });
  }

  // Methods to add/remove passengers.
  addPassenger(passengerData?: Partial<BookingFormPassenger>): void {
    this.passengers.push(this.createPassenger(passengerData));
    console.log(this.passengers.controls.length);
    this.passengers.updateValueAndValidity();
  }

  addBooking(booking: Booking) {
    for (const passenger of booking.passengers) {
      this.addPassenger({
        firstName: passenger.name.split(' ')?.[0]?.trim(),
        lastName: passenger.name.split(' ')?.[1]?.trim(),
        baggage: passenger.baggage,
        seat: passenger.seatNumber,
        passportId: passenger.passportNumber,
      });
    }
  }

  removePassenger(index: number): void {
    this.passengers.removeAt(index);
    this.passengers.updateValueAndValidity();
  }

  // Manage the current passenger's passport ID (for baggage editing)
  setCurrentBaggagePassengerId(passportId: string) {
    this.currentPassengerBaggageId.set(passportId);
  }

  setCurrentSeatPassengerId(passportId: string) {
    this.currentPassengerSeatsId.set(passportId);
  }

  getCurrentBaggagePassengerId(): string | null {
    return this.currentPassengerBaggageId();
  }

  getCurrentSeatPassengerId(): string | null {
    return this.currentPassengerSeatsId();
  }

  getCurrentBaggagePassenger() {
    return this.passengers.controls.find((group) => {
      return (
        group.get('passportId')?.value === this.currentPassengerBaggageId()
      );
    });
  }

  getCurrentSeatPassenger() {
    return this.passengers.controls.find((group) => {
      return group.get('passportId')?.value === this.currentPassengerSeatsId();
    });
  }

  // Calculate the baggage summary for all passengers based on their baggage array.
  getBaggageSummary(): SingleBaggageSummary[] {
    const summary: SingleBaggageSummary[] = [];
    this.passengers.controls.forEach((control: AbstractControl) => {
      const group = control as FormGroup;
      const baggage = this.getBaggageForGroup(group);
      const firstName = group.get('firstName')?.value;
      const lastName = group.get('lastName')?.value;
      const passportId = group.get('passportId')?.value;
      const passengerName = `${firstName} ${lastName}`;
      const price = this.computeBaggagePrice(baggage);
      const itemsExplain = this.computeItemsExplanation(baggage);
      summary.push({
        items: baggage,
        itemsExplain,
        price,
        passengerName,
        passportNumber: passportId,
      });
    });
    return summary;
  }

  private getBaggageForGroup(group: FormGroup): Baggage[] {
    // Extract the baggage array from the passenger's form group.
    return ((group.get('baggage')?.value as string[]) || []) as Baggage[];
  }

  private computeBaggagePrice(baggage: Baggage[]): number {
    // Sum the price for each baggage item based on the description mapping.
    return baggage.reduce((total, item) => {
      return total + (BAGGAGE_TYPE_TO_DESCRIPTION[item]?.price || 0);
    }, 0);
  }

  private computeItemsExplanation(baggage: Baggage[]): string {
    // Create a summary explanation based on the count of each baggage type.
    if (baggage.length === 0) return '-';
    const counts = baggage.reduce(
      (acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(counts)
      .map(([item, count]) => `${item} baggage (x${count})`)
      .join(', ');
  }

  public getSeatSummaryState(): SeatSummaryState {
    const state: SeatSummaryState = {
      items: [],
      totalExtraCost: 0,
    };

    this.passengers.controls.forEach((control: AbstractControl) => {
      const group = control as FormGroup;
      const passportId = group.get('passportId')?.value;
      const firstName = group.get('firstName')?.value;
      const lastName = group.get('lastName')?.value;
      const seatId = group.get('seat')?.value;

      const seatType = this.getSeatType(seatId);
      const seatCost = this.getSeatCost(seatType);

      state.items.push({
        passengerName: `${firstName} ${lastName}`,
        seatId: seatId ?? AUTO_ASSIGNED_PLACE,
        passportNumber: passportId,
        seatType: seatType,
        extraCost: seatCost,
      });
      state.totalExtraCost += seatCost;
    });

    return state;
  }

  private getSeatType(seatId: string) {
    const prefixMatch = seatId.match(/^[A-Z]+/);
    if (!prefixMatch) return SeatSectionType.Economy;

    const prefix = prefixMatch[0];
    return PREFIX_TO_SEAT_TYPE[prefix];
  }

  private getSeatCost(seatType: SeatSectionType | string): number {
    if (seatType in SEAT_TYPE_TO_EXTRA_COST) {
      return SEAT_TYPE_TO_EXTRA_COST[seatType as SeatSectionType];
    }
    return 0;
  }

  public toBooking(flight: Flight, price: number): Booking {
    const passengers = this.getPassengers();
    return new Booking(flight.flightNumber, passengers, price);
  }

  public getPassengers(): Passenger[] {
    return this.passengers.controls.map(
      (p) =>
        new Passenger(
          `${p.get('firstName')?.value} ${p.get('lastName')?.value}`.trim(),
          p.get('passportId')?.value,
          p.get('seat')?.value,
          p.get('baggage')?.value
        )
    );
  }
}
