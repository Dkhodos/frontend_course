import { Injectable } from '@angular/core';
import { SeatSummaryItem } from '../seats-step/components/seat-selector/seat-selector.types';
import { SingleBaggageSummary } from '../baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';
import { Flight } from '../../../../../../../models/flight.model';
import { CouponType } from '../../../../../../../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class SummaryStepService {
  getTotalSeatCost(seatSummaryItems: SeatSummaryItem[]): number {
    return seatSummaryItems.reduce((sum, item) => sum + item.extraCost, 0);
  }

  getTotalBaggageCost(baggageSummary: SingleBaggageSummary[]): number {
    return baggageSummary.reduce((sum, item) => sum + item.price, 0);
  }

  getFlightPrice(flight: Flight): number {
    return flight.price;
  }

  /**
   * Returns the base final price (flight + seats + baggage)
   */
  getFinalPrice(
    flight: Flight,
    seatSummaryItems: SeatSummaryItem[],
    baggageSummary: SingleBaggageSummary[]
  ): number {
    return (
      Number(this.getFlightPrice(flight)) +
      Number(this.getTotalSeatCost(seatSummaryItems)) +
      Number(this.getTotalBaggageCost(baggageSummary))
    );
  }

  /**
   * Returns the discount value given a final price and a discount rate (e.g. 0.2 for 20%)
   */
  getDiscountPrice(
    finalPrice: number,
    discount: number,
    type: CouponType
  ): number {
    if (type === CouponType.Percentage) return finalPrice * discount;
    return Math.min(finalPrice, discount);
  }

  /**
   * Returns the overall price after discount
   */
  getOverallPrice(
    finalPrice: number,
    discount: number,
    type: CouponType
  ): number {
    return finalPrice - this.getDiscountPrice(finalPrice, discount, type);
  }
}
