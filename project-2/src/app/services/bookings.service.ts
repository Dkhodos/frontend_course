import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { FlightsService } from './flights.service';
import { Booking, BookingFirestoreData } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private static readonly COLLECTION_NAME = 'bookings';

  constructor(
    private firestore: Firestore,
    private flightsService: FlightsService
  ) {}

  /**
   * Fetch all bookings and resolve flight & passenger data.
   */
  async list(): Promise<Booking[]> {
    console.log('Fetching bookings...');
    const bookingsRef = collection(
      this.firestore,
      BookingsService.COLLECTION_NAME
    );
    const bookingsSnapshot = await getDocs(bookingsRef);

    const bookings = await Promise.all(
      bookingsSnapshot.docs.map(async (docSnap) => {
        const data = docSnap.data() as BookingFirestoreData;
        const flightNumber = await this.getFlightNumber(data.flight);
        return Booking.fromFirestore(data, flightNumber || 'UNKNOWN');
      })
    );

    console.log('✅ Bookings data received', bookings);
    return bookings;
  }

  /**
   * Fetch a single booking by flight number.
   */
  async get(flightNumber: string): Promise<Booking | null> {
    console.log(`Fetching booking for flight ${flightNumber}...`);
    const flightDocRef = doc(this.firestore, `flights/${flightNumber}`);
    const bookingQuery = query(
      collection(this.firestore, BookingsService.COLLECTION_NAME),
      where('flight', '==', flightDocRef)
    );
    const bookingSnapshot = await getDocs(bookingQuery);
    if (bookingSnapshot.empty) {
      console.warn(`❌ Booking for flight ${flightNumber} not found`);
      return null;
    }
    const bookingDoc = bookingSnapshot.docs[0];
    const data = bookingDoc.data() as BookingFirestoreData;
    return Booking.fromFirestore(data, flightNumber);
  }

  /**
   * Add a new booking.
   * Also triggers an update of the flight's seat reservations.
   */
  async add(booking: Booking): Promise<void> {
    console.log(`Adding booking for flight ${booking.flightNumber}...`);
    const flightDocRef = doc(this.firestore, `flights/${booking.flightNumber}`);
    const bookingDocRef = doc(
      collection(this.firestore, BookingsService.COLLECTION_NAME)
    );
    await setDoc(bookingDocRef, booking.toFirestore(flightDocRef));
    console.log(
      `✅ Booking added successfully for flight ${booking.flightNumber}`
    );
    await this.flightsService.adjustSeatReservations(booking.flightNumber);
  }

  /**
   * Update an existing booking.
   * Also triggers an update of the flight's seat reservations.
   */
  async update(bookingId: string, booking: Booking): Promise<void> {
    console.log(
      `Updating booking ${bookingId} for flight ${booking.flightNumber}...`
    );
    const flightDocRef = doc(this.firestore, `flights/${booking.flightNumber}`);
    const bookingDocRef = doc(
      this.firestore,
      BookingsService.COLLECTION_NAME,
      bookingId
    );

    // Get the Firestore-compatible object
    const firestoreData = booking.toFirestore(flightDocRef);

    // Firestore requires an explicit object spread for `updateDoc`
    await updateDoc(bookingDocRef, { ...firestoreData });

    console.log(
      `✅ Booking ${bookingId} updated successfully for flight ${booking.flightNumber}`
    );
    await this.flightsService.adjustSeatReservations(booking.flightNumber);
  }

  /**
   * Delete a booking.
   * Also triggers an update of the flight's seat reservations.
   */
  async delete(bookingId: string, flightNumber: string): Promise<void> {
    console.log(`Deleting booking ${bookingId} for flight ${flightNumber}...`);
    const bookingDocRef = doc(
      this.firestore,
      BookingsService.COLLECTION_NAME,
      bookingId
    );
    await deleteDoc(bookingDocRef);
    console.log(`✅ Booking ${bookingId} deleted successfully`);
    await this.flightsService.adjustSeatReservations(flightNumber);
  }

  /**
   * Extracts the flight number from a Firestore document reference.
   */
  private async getFlightNumber(
    flightRef: DocumentReference
  ): Promise<string | null> {
    const flightSnap = await getDoc(flightRef);
    return flightSnap.exists() ? flightSnap.id : null;
  }
}
