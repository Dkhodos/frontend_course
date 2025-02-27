import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  where,
} from '@angular/fire/firestore';
import { Flight, FlightFirestoreData } from '../models/flight.model';
import { BookingFirestoreData, PassengerData } from '../models/booking.model';

interface FlightsFilters {
  dateRange?: { start: string; end: string };
  origin?: string;
  destination?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private static readonly COLLECTION_NAME = 'flights';

  constructor(private firestore: Firestore) {}

  // flights.service.ts

  async list(filters?: FlightsFilters): Promise<Flight[]> {
    console.log('Fetching flights with filters...', filters);

    const flightsRef = collection(
      this.firestore,
      FlightsService.COLLECTION_NAME
    );
    const constraints = this.buildConstraints(filters);

    const flightsQuery = query(flightsRef, ...constraints);
    const snapshot = await getDocs(flightsQuery);

    const flights = snapshot.docs.map((doc) =>
      Flight.fromFirestore(doc.data() as FlightFirestoreData)
    );

    console.log('✅ Flights data received:', flights);
    return flights;
  }

  async get(flightNumber: string): Promise<Flight | null> {
    console.log(`Fetching flight ${flightNumber}...`);

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flightNumber
    );
    const flightSnap = await getDoc(flightDoc);

    if (flightSnap.exists()) {
      console.log(`✅ Flight ${flightNumber} found`);
      return Flight.fromFirestore(flightSnap.data() as FlightFirestoreData);
    }
    console.log(`❌ Flight ${flightNumber} not found`);
    return null;
  }

  async add(flight: Flight): Promise<void> {
    console.log(`Adding flight ${flight.flightNumber}...`);

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flight.flightNumber
    );
    await setDoc(flightDoc, flight.toFirestore());

    console.log(`✅ Flight ${flight.flightNumber} added successfully`);
  }

  async update(flight: Flight): Promise<void> {
    console.log(`Updating flight ${flight.flightNumber}...`);

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flight.flightNumber
    );

    try {
      await updateDoc(flightDoc, { ...flight.toFirestore() });
      console.log(`✅ Flight ${flight.flightNumber} updated successfully`);
    } catch (error) {
      console.error(
        `❌ Failed to update flight ${flight.flightNumber}:`,
        error
      );
      throw error;
    }
  }

  async delete(flightNumber: string): Promise<void> {
    console.log(`Deleting flight ${flightNumber}...`);

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flightNumber
    );

    try {
      await deleteDoc(flightDoc);
      console.log(`✅ Flight ${flightNumber} deleted successfully`);
    } catch (error) {
      console.error(`❌ Failed to delete flight ${flightNumber}:`, error);
      throw error;
    }
  }

  /**
   * Adjusts the seat reservations for a flight by scanning all bookings.
   * This method queries the 'bookings' collection for documents related to the flight,
   * extracts all reserved seats from each booking's passengers, deduplicates them,
   * and updates the flight document's seatsTaken field.
   *
   * Assumes each booking document has a 'flightNumber' field and a 'passengers' array,
   * where each passenger object contains a 'seat' property.
   */
  async adjustSeatReservations(flightNumber: string): Promise<void> {
    console.log(`Adjusting seat reservations for flight ${flightNumber}...`);

    // Query all bookings for the given flight
    const bookingsRef = collection(this.firestore, 'bookings');
    const bookingsQuery = query(
      bookingsRef,
      where('flight', '==', doc(this.firestore, `flights/${flightNumber}`))
    );
    const snapshot = await getDocs(bookingsQuery);

    // Collect reserved seats from all bookings
    const reservedSeats: string[] = [];

    snapshot.docs.forEach((docSnap) => {
      const booking = docSnap.data() as BookingFirestoreData;

      // Correctly access passengers with index signature
      if (booking['passengers'] && Array.isArray(booking['passengers'])) {
        booking['passengers'].forEach((passenger: PassengerData) => {
          reservedSeats.push(passenger.seatNumber);
        });
      }
    });

    // Remove duplicates
    const uniqueSeats = Array.from(new Set(reservedSeats));

    // Update the flight document with the new seatsTaken list
    const flightDoc = doc(this.firestore, 'flights', flightNumber);
    await updateDoc(flightDoc, { seatsTaken: uniqueSeats });

    console.log(`✅ Seat reservations adjusted for flight ${flightNumber}`);
  }

  private buildConstraints(filters?: FlightsFilters) {
    const constraints = [];

    if (filters) {
      if (filters.dateRange?.start) {
        constraints.push(where('boardingDate', '>=', filters.dateRange.start));
      }
      if (filters.dateRange?.end) {
        constraints.push(where('boardingDate', '<=', filters.dateRange.end));
      }
      if (filters.origin) {
        constraints.push(where('originCode', '==', filters.origin));
      }
      if (filters.destination) {
        constraints.push(where('destinationCode', '==', filters.destination));
      }
      if (constraints.length === 0) {
        throw new Error('At least one filter must be selected');
      }
    }

    constraints.push(orderBy('boardingDate', 'desc'));

    return constraints;
  }
}
