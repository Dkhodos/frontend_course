import { DocumentReference } from '@angular/fire/firestore';
import Passenger from './passenger.model';

export enum BookingStatus {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

/**
 * Firestore data structure for a Booking.
 */
export interface BookingFirestoreData {
  flight: DocumentReference; // Reference to `/flights/{flightNumber}`
  finalPrice: number;
  passengers: PassengerData[];
  status: BookingStatus;
}

/**
 * Data structure for a Passenger inside a Booking.
 */
export interface PassengerData {
  name: string;
  passportNumber: string;
  seatNumber: string;
}

/**
 * Booking model used in the application.
 */
export class Booking {
  constructor(
    public flightNumber: string,
    public passengers: Passenger[],
    public finalPrice = 0,
    public status: BookingStatus = BookingStatus.Enabled
  ) {}

  get passengerCount(): number {
    return this.passengers.length;
  }

  static fromFirestore(
    data: BookingFirestoreData,
    flightNumber: string
  ): Booking {
    const passengers = data.passengers.map(
      (p) => new Passenger(p.name, p.passportNumber, p.seatNumber)
    );
    return new Booking(flightNumber, passengers, data.finalPrice, data.status);
  }

  toFirestore(flightDocRef: DocumentReference): BookingFirestoreData {
    return {
      flight: flightDocRef,
      finalPrice: this.finalPrice,
      status: this.status,
      passengers: this.passengers.map((p) => ({
        name: p.name,
        passportNumber: p.passportNumber,
        seatNumber: p.seatNumber,
      })),
    };
  }
}
