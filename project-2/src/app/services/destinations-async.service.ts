import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import {
  Destination,
  DestinationFirestoreData,
} from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  private static readonly COLLECTION_NAME = 'destinations';

  constructor(private firestore: Firestore) {}

  /**
   * List all destinations.
   */
  async list(): Promise<Destination[]> {
    console.log('Fetching destinations...'); // ✅ Debugging Log

    const destinationsRef = collection(
      this.firestore,
      DestinationsService.COLLECTION_NAME
    );
    const snapshot = await getDocs(destinationsRef);

    const destinations = snapshot.docs.map((doc) =>
      Destination.fromFirestore(doc.data() as DestinationFirestoreData)
    );

    console.log('✅ Destinations data received:', destinations); // ✅ Debugging Log
    return destinations;
  }

  /**
   * Get a single destination by its code (ID in Firestore).
   */
  async get(code: string): Promise<Destination | null> {
    console.log(`Fetching destination ${code}...`); // ✅ Debugging Log

    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      code
    );
    const destinationSnap = await getDoc(destinationDoc);

    if (destinationSnap.exists()) {
      console.log(`✅ Destination ${code} found`); // ✅ Debugging Log
      return Destination.fromFirestore(
        destinationSnap.data() as DestinationFirestoreData
      );
    }
    console.log(`❌ Destination ${code} not found`); // ✅ Debugging Log
    return null;
  }

  /**
   * Add or update a destination in Firestore using `code` as the document ID.
   */
  async add(destination: Destination): Promise<void> {
    console.log(`Adding destination ${destination.code}...`); // ✅ Debugging Log

    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      destination.code
    );
    await setDoc(destinationDoc, destination.toFirestore());

    console.log(`✅ Destination ${destination.code} added successfully`); // ✅ Debugging Log
  }
}
