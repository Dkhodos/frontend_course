export interface CouponFirestoreData {
  code: string;
  name: string;
  description: string;
  amount: number; // value between 0 and 1
}

export class Coupon {
  constructor(
    public code: string,
    public name: string,
    public description: string,
    public amount: number // value between 0 and 1
  ) {}

  static fromFirestore(data: CouponFirestoreData): Coupon {
    return new Coupon(data.code, data.name, data.description, data.amount);
  }

  toFirestore(): CouponFirestoreData {
    return {
      code: this.code,
      name: this.name,
      description: this.description,
      amount: this.amount,
    };
  }
}
