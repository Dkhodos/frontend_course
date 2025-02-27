import { Timestamp } from '@angular/fire/firestore';
import { dateUtils } from '../utils/date-utils';

export enum CouponType {
  Percentage = 'percentage',
  Amount = 'amount',
}

export interface CouponFirestoreData {
  code: string;
  name: string;
  description: string;
  amount: number;
  uses: number;
  startDate: Timestamp;
  endDate: Timestamp;
  type: CouponType;
}

export class Coupon {
  constructor(
    public code: string,
    public name: string,
    public description: string,
    public amount: number,
    public uses: number,
    public startDate: string,
    public startTime: string,
    public endDate: string,
    public endTime: string,
    public type: CouponType = CouponType.Percentage
  ) {}

  isValid(): string {
    if (this.uses < 1) {
      return 'Coupon must have at least 1 use.';
    }
    const startTS = dateUtils.toTimestamp(this.startDate, this.startTime);
    const endTS = dateUtils.toTimestamp(this.endDate, this.endTime);
    // Assumes Timestamp objects have a 'seconds' property for comparison.
    if (startTS.seconds >= endTS.seconds) {
      return 'Start date/time must be before end date/time.';
    }
    return '';
  }

  static fromFirestore(data: CouponFirestoreData): Coupon {
    return new Coupon(
      data.code,
      data.name,
      data.description,
      data.amount,
      data.uses,
      dateUtils.fromTimestampToDate(data.startDate),
      dateUtils.fromTimestampToTime(data.startDate),
      dateUtils.fromTimestampToDate(data.endDate),
      dateUtils.fromTimestampToTime(data.endDate),
      data.type
    );
  }

  toFirestore(): CouponFirestoreData {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      amount: this.amount,
      type: this.type,
      startDate: dateUtils.toTimestamp(this.startDate, this.startTime),
      endDate: dateUtils.toTimestamp(this.endDate, this.endTime),
      uses: this.uses,
    };
  }
}
