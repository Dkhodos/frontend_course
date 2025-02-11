import Passenger from './passenger.model';
import { DocumentReference } from '@angular/fire/firestore';

/**
 * Firestore data structure for Bookings.
 */
export interface BookingFirestoreData {
  flight: DocumentReference; // Firestore reference path `/flights/{flightNumber}`
}

/**
 * Firestore data structure for Passengers.
 */
export interface PassengerFirestoreData {
  name: string;
  passportNumber: string;
}

/**
 * Firestore data structure for Bookings-Passengers relation.
 */
export interface BookingPassengerFirestoreData {
  booking: DocumentReference; // Firestore reference path `/bookings/{bookingId}`
  passenger: DocumentReference; // Firestore reference path `/passengers/{passportNumber}`
  seatNumber: string;
}

class Booking {
  constructor(
    public flightNumber: string,
    public passengers: Passenger[]
  ) {}

  get passengerCount() {
    return this.passengers.length;
  }
}

export default Booking;
