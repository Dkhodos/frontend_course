import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Destination,
  DestinationFirestoreData,
  DestinationStatus,
} from '../models/destination.model';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  private static readonly COLLECTION_NAME = 'destinations';

  constructor(private firestore: Firestore) {}

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

  async update(destination: Destination): Promise<void> {
    console.log(`Updating destination ${destination.code}...`);

    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      destination.code
    );

    try {
      await updateDoc(destinationDoc, { ...destination.toFirestore() });
      console.log(`✅ Destination ${destination.code} updated successfully`);
    } catch (error) {
      console.error(
        `❌ Failed to update destination ${destination.code}:`,
        error
      );
      throw error;
    }
  }

  async delete(code: string) {
    console.log(`Deleting destination ${code}...`);

    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      code
    );

    try {
      await deleteDoc(destinationDoc);
      console.log(`✅ Destination ${code} deleted successfully`);
    } catch (error) {
      console.error(`❌ Failed to deleted Destination ${code}:`, error);
      throw error;
    }
  }

  async disable(code: string) {
    return this.modifyStatus(code, DestinationStatus.Disabled);
  }

  async enable(code: string) {
    return this.modifyStatus(code, DestinationStatus.Disabled);
  }

  private async modifyStatus(code: string, status: DestinationStatus) {
    console.log(`destination ${code} moving status to ${status}...`);

    const destinationDoc = doc(
      this.firestore,
      DestinationsService.COLLECTION_NAME,
      code
    );

    try {
      await updateDoc(destinationDoc, { status: DestinationStatus.Disabled });
      console.log(`✅ Destination ${code} status is now ${status}`);
    } catch (error) {
      console.error(`❌ Failed to update destination ${code} status :`, error);
      throw error;
    }
  }
}
