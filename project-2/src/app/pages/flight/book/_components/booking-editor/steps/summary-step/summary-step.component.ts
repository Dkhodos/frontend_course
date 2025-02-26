import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Flight } from '../../../../../../../models/flight.model';
import Passenger from '../../../../../../../models/passenger.model';
import { SeatSummaryItem } from '../seats-step/components/seat-selector/seat-selector.types';
import { MatStepper } from '@angular/material/stepper';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../../../components/form-input/form-input.component';
import { ButtonComponent } from '../../../../../../../components/button/button.component';
import { CouponsService } from '../../../../../../../services/coupons.service';
import { ToastService } from '../../../../../../../components/toast/toast.service';
import { SingleBaggageSummary } from '../baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    FormInputComponent,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss'],
})
export class SummaryStepComponent {
  @Input() stepper!: MatStepper;
  @Input() flight!: Flight;
  @Input() passengers: Passenger[] = [];
  @Input() seatSummaryItems!: SeatSummaryItem[];
  @Input() baggageSummary!: SingleBaggageSummary[];
  @Output() book = new EventEmitter<{ discount: number }>();

  form: FormGroup;
  discount = 0;
  loadingDiscount = false;

  constructor(
    private couponService: CouponsService,
    private toastService: ToastService
  ) {
    this.form = new FormGroup({
      couponCode: new FormControl(''),
    });
  }

  getTotalSeatCost(): number {
    return this.seatSummaryItems.reduce((sum, item) => sum + item.extraCost, 0);
  }

  getTotalBaggageCost() {
    return this.baggageSummary.reduce((sum, item) => sum + item.price, 0);
  }

  getFlightPrice(): number {
    return this.flight.price;
  }

  getDiscountPrice() {
    if (!this.discount) return 0;

    const finalPrice = this.getFinalPrice();

    return finalPrice * this.discount;
  }

  getOverallPrice(): number {
    let finalPrice = this.getFinalPrice();
    if (this.discount) {
      finalPrice -= this.getDiscountPrice();
    }
    return finalPrice;
  }

  getFinalPrice() {
    return (
      Number(this.getFlightPrice()) +
      Number(this.getTotalSeatCost()) +
      Number(this.getTotalBaggageCost())
    );
  }

  getSeatSummaryText(passenger: Passenger): string {
    const item = this.seatSummaryItems.find(
      (s) => s.passportNumber === passenger.passportNumber
    );
    return item && item.seatId ? item.seatId : 'auto assigned';
  }

  getBaggageSummaryText(passenger: Passenger): string {
    const item = this.baggageSummary.find(
      (b) => b.passportNumber === passenger.passportNumber
    );
    return item && item.items.length > 0
      ? `selected ${item.itemsExplain}`
      : 'no baggage';
  }

  getSeatPrices() {
    return this.seatSummaryItems.map((seat) => ({
      label: `Seat (${seat.seatType})`,
      value: seat.extraCost,
    }));
  }

  getBaggagePrices() {
    return this.baggageSummary.map((b) => ({
      label: b.itemsExplain,
      value: b.price,
    }));
  }

  onBook(): void {
    this.book.emit({ discount: this.discount });
  }

  async submitCoupon() {
    const couponCode = this.form.get('couponCode')?.value;
    console.log('couponCode', couponCode);
    if (!couponCode) return;

    this.loadingDiscount = true;
    this.discount = 0;
    try {
      const coupon = await this.couponService.get(couponCode);
      if (coupon) {
        this.discount = coupon.amount;
        this.toastService.add({
          id: 'add-coupon-booking-success',
          variant: 'success',
          title: 'Coupon added!',
          description: `Coupon ${coupon.code} added successfully.`,
        });
      } else {
        this.toastService.add({
          id: 'add-coupon-booking-warning',
          variant: 'warning',
          title: 'Coupon does not exist!',
          description: `Coupon ${couponCode} does not exist.`,
        });
      }
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'add-coupon-error',
        variant: 'error',
        title: 'Coupon was not added!',
        description: 'An unexpected error occurred, please try again.',
      });
    } finally {
      this.loadingDiscount = false;
    }
  }
}
