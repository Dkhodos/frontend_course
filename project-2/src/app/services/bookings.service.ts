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
  DocumentReference,
} from '@angular/fire/firestore';
import Booking, {
  BookingFirestoreData,
  BookingPassengerFirestoreData,
  PassengerFirestoreData,
} from '../models/booking.model';
import Passenger from '../models/passenger.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private static readonly BOOKINGS_COLLECTION = 'bookings';
  private static readonly PASSENGERS_COLLECTION = 'passengers';
  private static readonly BOOKINGS_PASSENGERS_COLLECTION =
    'bookings_passengers';

  constructor(private firestore: Firestore) {}

  /**
   * Fetch all bookings and resolve flight & passenger data.
   */
  async list(): Promise<Booking[]> {
    console.log('Fetching bookings...');

    const bookingsRef = collection(
      this.firestore,
      BookingsService.BOOKINGS_COLLECTION
    );
    const bookingsSnapshot = await getDocs(bookingsRef);

    const bookings = await Promise.all(
      bookingsSnapshot.docs.map(async (bookingDoc) => {
        const bookingData = bookingDoc.data() as BookingFirestoreData;
        const flightNumber =
          (await this.getFlightNumber(bookingData.flight)) ?? 'UNKNOWN';
        const passengers = await this.getPassengersForBooking(bookingDoc.id);
        return new Booking(flightNumber, passengers);
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
      collection(this.firestore, BookingsService.BOOKINGS_COLLECTION),
      where('flight', '==', flightDocRef)
    );
    const bookingSnapshot = await getDocs(bookingQuery);

    if (bookingSnapshot.empty) {
      console.warn(`❌ Booking for flight ${flightNumber} not found`);
      return null;
    }

    const bookingDoc = bookingSnapshot.docs[0];
    const passengers = await this.getPassengersForBooking(bookingDoc.id);
    return new Booking(flightNumber, passengers);
  }

  /**
   * Add a new booking.
   */
  async add(booking: Booking): Promise<void> {
    console.log(`Adding booking for flight ${booking.flightNumber}...`);

    const flightDocRef = doc(this.firestore, `flights/${booking.flightNumber}`);

    // Step 1: Create a booking document
    const bookingDocRef = doc(
      collection(this.firestore, BookingsService.BOOKINGS_COLLECTION)
    );
    await setDoc(bookingDocRef, {
      flight: flightDocRef,
    } as BookingFirestoreData);

    // Step 2: Link passengers
    await Promise.all(
      booking.passengers.map((passenger) =>
        this.addPassenger(passenger, bookingDocRef.id)
      )
    );

    console.log(
      `✅ Booking added successfully for flight ${booking.flightNumber}`
    );
  }

  /**
   * Get passengers for a given booking.
   */
  private async getPassengersForBooking(
    bookingId: string
  ): Promise<Passenger[]> {
    console.log(`Fetching passengers for booking ${bookingId}...`);

    const bookingDocRef = doc(this.firestore, `bookings/${bookingId}`);

    const bookingsPassengersRef = collection(
      this.firestore,
      BookingsService.BOOKINGS_PASSENGERS_COLLECTION
    );

    const passengerQuery = query(
      bookingsPassengersRef,
      where('booking', '==', bookingDocRef)
    );

    const passengerSnapshot = await getDocs(passengerQuery);

    const passengers = await Promise.all(
      passengerSnapshot.docs.map(async (docSnap) => {
        const relationData = docSnap.data() as BookingPassengerFirestoreData;

        console.log('🔹 Booking-Passenger Relation Found:', relationData);

        const passengerRef = relationData.passenger; // Firestore reference
        const passengerSnapshot = await getDoc(passengerRef);

        if (passengerSnapshot.exists()) {
          const data = passengerSnapshot.data() as PassengerFirestoreData;
          console.log('✅ Passenger Retrieved:', data);
          return new Passenger(data.name, data.passportNumber);
        } else {
          console.warn('❌ Passenger not found:', passengerRef.path);
          return null;
        }
      })
    );

    return passengers.filter((p) => p !== null) as Passenger[];
  }

  /**
   * Add a passenger if they do not exist and create a relation.
   */
  private async addPassenger(
    passenger: Passenger,
    bookingId: string
  ): Promise<void> {
    console.log(
      `Adding passenger ${passenger.name} (${passenger.passportNumber})...`
    );

    const passengerDocRef = doc(
      this.firestore,
      `passengers/${passenger.passportNumber}`
    );
    const passengerSnapshot = await getDoc(passengerDocRef);

    if (!passengerSnapshot.exists()) {
      await setDoc(passengerDocRef, {
        name: passenger.name,
        passportNumber: passenger.passportNumber,
      } as PassengerFirestoreData);
    }

    // Create relation in `bookings_passengers`
    const relationDoc = doc(
      collection(this.firestore, BookingsService.BOOKINGS_PASSENGERS_COLLECTION)
    );
    await setDoc(relationDoc, {
      booking: doc(this.firestore, `bookings/${bookingId}`),
      passenger: passengerDocRef,
      seatNumber: `${Math.floor(Math.random() * 50) + 1}${['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)]}`, // Random seat
    } as BookingPassengerFirestoreData);

    console.log(
      `✅ Passenger ${passenger.name} linked to booking ${bookingId}`
    );
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
