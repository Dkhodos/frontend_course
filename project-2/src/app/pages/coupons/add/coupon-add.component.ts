import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CouponEditorComponent,
  CouponData,
} from '../_components/coupon-editor/coupon-editor.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from '../../../components/page/page.component';
import { CouponsService } from '../../../services/coupons.service';
import { ToastService } from '../../../components/toast/toast.service';
import { Coupon } from '../../../models/coupon.model';
import { UrlService } from '../../../services/url.service';
import { dateUtils } from '../../../utils/date-utils';

@Component({
  selector: 'app-coupon-add',
  templateUrl: 'coupon-add.component.html',
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    CouponEditorComponent,
    ReactiveFormsModule,
  ],
})
export class CouponAddPageComponent {
  isLoading = signal(false);

  constructor(
    private couponsService: CouponsService,
    private toastService: ToastService,
    private router: Router,
    private urlService: UrlService
  ) {}

  async onSave(couponData: CouponData): Promise<void> {
    this.isLoading.set(true);

    try {
      const existingCoupon = await this.couponsService.get(couponData.code);
      if (existingCoupon) {
        this.isLoading.set(false);
        this.toastService.add({
          id: 'add-coupon-exist',
          variant: 'error',
          title: 'Coupon was not added!',
          description: `Coupon ${couponData.code} already exists in our system.`,
        });
        return;
      }

      const startDateStr = dateUtils.formatDate(couponData.startDate);
      const endDateStr = dateUtils.formatDate(couponData.endDate);

      const newCoupon = new Coupon(
        couponData.code,
        couponData.name,
        couponData.description,
        couponData.amount,
        couponData.uses,
        startDateStr,
        couponData.startTime,
        endDateStr,
        couponData.endTime,
        couponData.type
      );
      await this.couponsService.add(newCoupon);

      this.toastService.add({
        id: 'add-coupon-success',
        variant: 'success',
        title: 'Coupon added!',
        description: `Coupon ${newCoupon.code} added successfully.`,
      });

      this.isLoading.set(false);
      await this.router.navigate(this.urlService.getCouponsManageURL());
    } catch (error) {
      console.error(error);
      this.toastService.add({
        id: 'add-coupon-error',
        variant: 'error',
        title: 'Coupon was not added!',
        description: 'An unexpected error occurred, please try again.',
      });
      this.isLoading.set(false);
    }
  }
}
