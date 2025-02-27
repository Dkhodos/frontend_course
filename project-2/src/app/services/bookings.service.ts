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
  DocumentReference,
} from '@angular/fire/firestore';
import { FlightsService } from './flights.service';
import {
  Booking,
  BookingFirestoreData,
  BookingStatus,
} from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  public static readonly COLLECTION_NAME = 'bookings';

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
   * Update a single booking by its document id.
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
   * Update the status of the booking for a given flight.
   * Since there is only one booking per flight, only the first document is updated.
   */
  async modifyStatusByFlightNumber(
    flightNumber: string,
    status: BookingStatus
  ): Promise<void> {
    console.log(
      `Updating status to ${status} for booking with flight ${flightNumber}...`
    );
    const flightDocRef = doc(this.firestore, `flights/${flightNumber}`);
    const bookingQuery = query(
      collection(this.firestore, BookingsService.COLLECTION_NAME),
      where('flight', '==', flightDocRef)
    );
    const bookingSnapshot = await getDocs(bookingQuery);
    if (bookingSnapshot.empty) {
      console.warn(`❌ No booking found for flight ${flightNumber}`);
      return;
    }
    const bookingDoc = bookingSnapshot.docs[0];
    await updateDoc(bookingDoc.ref, { status });
    console.log(
      `✅ Booking for flight ${flightNumber} updated to status ${status}`
    );
  }

  /**
   * Enable the booking for a given flight.
   */
  async enableBooking(flightNumber: string): Promise<void> {
    await this.modifyStatusByFlightNumber(flightNumber, BookingStatus.Enabled);
  }

  /**
   * Disable the booking for a given flight.
   */
  async disableBooking(flightNumber: string): Promise<void> {
    await this.modifyStatusByFlightNumber(flightNumber, BookingStatus.Disabled);
  }

  /**
   * Update the booking for a given flight with new booking data.
   * Since there is only one booking per flight, only the first document is updated.
   */
  async updateBookingByFlightNumber(
    flightNumber: string,
    booking: Booking
  ): Promise<void> {
    console.log(`Updating booking for flight ${flightNumber}...`);
    const flightDocRef = doc(this.firestore, `flights/${flightNumber}`);
    const bookingQuery = query(
      collection(this.firestore, BookingsService.COLLECTION_NAME),
      where('flight', '==', flightDocRef)
    );
    const bookingSnapshot = await getDocs(bookingQuery);
    if (bookingSnapshot.empty) {
      console.warn(`❌ No booking found for flight ${flightNumber}`);
      return;
    }
    const bookingDoc = bookingSnapshot.docs[0];
    const firestoreData = booking.toFirestore(flightDocRef);
    await updateDoc(bookingDoc.ref, { ...firestoreData });
    console.log(`✅ Booking for flight ${flightNumber} has been updated.`);
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
