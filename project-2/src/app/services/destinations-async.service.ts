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
  list(): Observable<Destination[]> {
    console.log('Fetching destinations...'); // ✅ Debugging Log

    return collectionData(
      collection(this.firestore, DestinationsService.COLLECTION_NAME),
      { idField: 'code' }
    ).pipe(
      tap(() => console.log('Destinations data received')), // ✅ Debugging Log
      map((destinations) =>
        (destinations as DestinationFirestoreData[]).map(
          Destination.fromFirestore
        )
      )
    );
  }

  /**
   * Get a single destination by its code (ID in Firestore).
   */
  async get(code: string): Promise<Destination | null> {
    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      code
    );
    const destinationSnap = await getDoc(destinationDoc);

    if (destinationSnap.exists()) {
      return Destination.fromFirestore(
        destinationSnap.data() as DestinationFirestoreData
      );
    }
    return null;
  }

  /**
   * Add or update a destination in Firestore using `code` as the document ID.
   */
  async add(destination: Destination): Promise<void> {
    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      destination.code
    );
    await setDoc(destinationDoc, destination.toFirestore()); // `setDoc` ensures `code` is the document ID.
  }
}
