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
import { MatStepper } from '@angular/material/stepper';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../../../components/form-input/form-input.component';
import { ButtonComponent } from '../../../../../../../components/button/button.component';
import { CouponsService } from '../../../../../../../services/coupons.service';
import { ToastService } from '../../../../../../../components/toast/toast.service';
import { SummaryStepService } from './summary-step.service';
import { CouponType } from '../../../../../../../models/coupon.model';
import { BookingFormService } from '../../services/booking-form.service';

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
  @Output() book = new EventEmitter<number>();

  form: FormGroup;
  discount = 0;
  discountType: CouponType = CouponType.Percentage;
  loadingDiscount = false;

  constructor(
    private couponService: CouponsService,
    private toastService: ToastService,
    private bookingFormService: BookingFormService,
    private summaryStepService: SummaryStepService
  ) {
    this.form = new FormGroup({
      couponCode: new FormControl(''),
    });
  }

  get finalPrice(): number {
    return this.summaryStepService.getFinalPrice(
      this.flight,
      this.bookingFormService.getSeatSummaryState().items,
      this.bookingFormService.getBaggageSummary()
    );
  }

  get discountPrice(): number {
    return this.summaryStepService.getDiscountPrice(
      this.finalPrice,
      this.discount,
      this.discountType
    );
  }

  get overallPrice(): number {
    return this.summaryStepService.getOverallPrice(
      this.finalPrice,
      this.discount,
      this.discountType
    );
  }

  get passengers() {
    return this.bookingFormService.getPassengers();
  }

  getSeatSummaryText(passenger: Passenger): string {
    const item = this.bookingFormService
      .getSeatSummaryState()
      .items.find((s) => s.passportNumber === passenger.passportNumber);
    return item && item.seatId ? item.seatId : 'auto assigned';
  }

  getBaggageSummaryText(passenger: Passenger): string {
    const item = this.bookingFormService
      .getBaggageSummary()
      .find((b) => b.passportNumber === passenger.passportNumber);
    return item && item.items.length > 0
      ? `selected ${item.itemsExplain}`
      : 'no baggage';
  }

  getSeatPrices() {
    return this.bookingFormService
      .getSeatSummaryState()
      .items.map((seat) => ({
        label: `Seat (${seat.seatType})`,
        value: seat.extraCost,
      }))
      .filter((s) => s.value);
  }

  getBaggagePrices() {
    return this.bookingFormService
      .getBaggageSummary()
      .map((b) => ({
        label: b.itemsExplain,
        value: b.price,
      }))
      .filter((b) => b.value);
  }

  onBook(): void {
    this.book.emit(this.overallPrice);
  }

  get discountLabelSymbol() {
    if (this.discountType === CouponType.Percentage) return '%';
    return '$';
  }

  async submitCoupon() {
    const couponCode = this.form.get('couponCode')?.value;
    if (!couponCode) return;

    this.loadingDiscount = true;
    this.discount = 0;
    try {
      const coupon = await this.couponService.get(couponCode);
      if (coupon) {
        const validationError = coupon.isValid();
        if (validationError) {
          this.toastService.add({
            id: 'add-coupon-booking-validation-warning',
            variant: 'warning',
            title: 'Coupon is invalid!!',
            description: validationError,
          });
          return;
        }

        this.discount = coupon.amount;
        this.discountType = coupon.type;
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
