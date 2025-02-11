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
} from '@angular/fire/firestore';
import { Flight, FlightFirestoreData } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private static readonly COLLECTION_NAME = 'flights';

  constructor(private firestore: Firestore) {}

  /**
   * List all flights sorted by boarding date.
   */
  async list(): Promise<Flight[]> {
    console.log('Fetching flights...'); // ✅ Debugging Log

    const flightsRef = collection(
      this.firestore,
      FlightsService.COLLECTION_NAME
    );
    const flightsQuery = query(flightsRef, orderBy('boardingDate')); // ✅ Sorting by boardingDate
    const snapshot = await getDocs(flightsQuery);

    const flights = snapshot.docs.map((doc) =>
      Flight.fromFirestore(doc.data() as FlightFirestoreData)
    );

    console.log('✅ Flights data received:', flights); // ✅ Debugging Log
    return flights;
  }

  /**
   * Get a single flight by its flightNumber (ID in Firestore).
   */
  async get(flightNumber: string): Promise<Flight | null> {
    console.log(`Fetching flight ${flightNumber}...`); // ✅ Debugging Log

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flightNumber
    );
    const flightSnap = await getDoc(flightDoc);

    if (flightSnap.exists()) {
      console.log(`✅ Flight ${flightNumber} found`); // ✅ Debugging Log
      return Flight.fromFirestore(flightSnap.data() as FlightFirestoreData);
    }
    console.log(`❌ Flight ${flightNumber} not found`); // ✅ Debugging Log
    return null;
  }

  /**
   * Add or update a flight in Firestore using `flightNumber` as the document ID.
   */
  async add(flight: Flight): Promise<void> {
    console.log(`Adding flight ${flight.flightNumber}...`); // ✅ Debugging Log

    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flight.flightNumber
    );
    await setDoc(flightDoc, flight.toFirestore());

    console.log(`✅ Flight ${flight.flightNumber} added successfully`); // ✅ Debugging Log
  }
}
