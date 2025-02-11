import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
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
  list(): Observable<Flight[]> {
    console.log('Fetching flights...'); // ✅ Debugging Log

    return collectionData(
      collection(this.firestore, FlightsService.COLLECTION_NAME),
      { idField: 'flightNumber' }
    ).pipe(
      tap(() => console.log('Flights data received')), // ✅ Debugging Log
      map((flights) =>
        (flights as FlightFirestoreData[]).map(Flight.fromFirestore)
      )
    );
  }

  /**
   * Get a single flight by its flightNumber (ID in Firestore).
   */
  async get(flightNumber: string): Promise<Flight | null> {
    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flightNumber
    );
    const flightSnap = await getDoc(flightDoc);

    if (flightSnap.exists()) {
      return Flight.fromFirestore(flightSnap.data() as FlightFirestoreData);
    }
    return null;
  }

  /**
   * Add or update a flight in Firestore using `flightNumber` as the document ID.
   */
  async add(flight: Flight): Promise<void> {
    const flightDoc = doc(
      this.firestore,
      FlightsService.COLLECTION_NAME,
      flight.flightNumber
    );
    await setDoc(flightDoc, flight.toFirestore()); // `setDoc` ensures `flightNumber` is the document ID.
  }
}
