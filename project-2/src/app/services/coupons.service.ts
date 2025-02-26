import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Coupon, CouponFirestoreData } from '../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  private static readonly COLLECTION_NAME = 'coupons';

  constructor(private firestore: Firestore) {}

  async list(): Promise<Coupon[]> {
    console.log('Fetching coupons...');
    const couponsRef = collection(
      this.firestore,
      CouponsService.COLLECTION_NAME
    );
    const snapshot = await getDocs(couponsRef);

    const coupons = snapshot.docs.map((docSnap) =>
      Coupon.fromFirestore(docSnap.data() as CouponFirestoreData)
    );

    console.log('✅ Coupons data received:', coupons);
    return coupons;
  }

  async get(code: string): Promise<Coupon | null> {
    console.log(`Fetching coupon ${code}...`);
    const couponDoc = doc(this.firestore, CouponsService.COLLECTION_NAME, code);
    const couponSnap = await getDoc(couponDoc);

    if (couponSnap.exists()) {
      console.log(`✅ Coupon ${code} found`);
      return Coupon.fromFirestore(couponSnap.data() as CouponFirestoreData);
    }
    console.log(`❌ Coupon ${code} not found`);
    return null;
  }

  async add(coupon: Coupon): Promise<void> {
    console.log(`Adding coupon ${coupon.code}...`);
    const couponDoc = doc(
      this.firestore,
      CouponsService.COLLECTION_NAME,
      coupon.code
    );
    await setDoc(couponDoc, coupon.toFirestore());
    console.log(`✅ Coupon ${coupon.code} added successfully`);
  }

  async update(coupon: Coupon): Promise<void> {
    console.log(`Updating coupon ${coupon.code}...`);
    const couponDoc = doc(
      this.firestore,
      CouponsService.COLLECTION_NAME,
      coupon.code
    );
    try {
      await updateDoc(couponDoc, { ...coupon.toFirestore() });
      console.log(`✅ Coupon ${coupon.code} updated successfully`);
    } catch (error) {
      console.error(`❌ Failed to update coupon ${coupon.code}:`, error);
      throw error;
    }
  }

  async delete(code: string): Promise<void> {
    console.log(`Deleting coupon ${code}...`);
    const couponDoc = doc(this.firestore, CouponsService.COLLECTION_NAME, code);
    try {
      await deleteDoc(couponDoc);
      console.log(`✅ Coupon ${code} deleted successfully`);
    } catch (error) {
      console.error(`❌ Failed to delete coupon ${code}:`, error);
      throw error;
    }
  }
}
