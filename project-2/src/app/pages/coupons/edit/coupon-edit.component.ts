import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CouponEditorComponent,
  CouponData,
} from '../_components/coupon-editor/coupon-editor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from '../../../components/page/page.component';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Coupon } from '../../../models/coupon.model';
import { CouponsService } from '../../../services/coupons.service';
import { ToastService } from '../../../components/toast/toast.service';
import { UrlService } from '../../../services/url.service';
import { dateUtils } from '../../../utils/date-utils';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: 'coupon-edit.component.html',
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    CouponEditorComponent,
    NotFoundPlaceholderComponent,
    LoaderComponent,
    ReactiveFormsModule,
  ],
})
export class CouponEditPageComponent implements OnInit {
  coupon = signal<Coupon | null>(null);
  isLoading = signal<boolean>(true);
  isUpdating = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private couponsService: CouponsService,
    private toastService: ToastService,
    private router: Router,
    private urlService: UrlService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCoupon();
  }

  private async loadCoupon(): Promise<void> {
    const couponCode = this.route.snapshot.paramMap.get('code');
    if (couponCode) {
      try {
        const fetchedCoupon = await this.couponsService.get(couponCode);
        this.coupon.set(fetchedCoupon);
      } catch (error) {
        console.error('Error fetching coupon:', error);
      }
    }
    this.isLoading.set(false);
  }

  async onSave(couponData: CouponData): Promise<void> {
    const serverCoupon = this.coupon();
    if (!serverCoupon) return;

    this.isUpdating.set(true);
    try {
      // Build updated coupon instance; code remains unchanged.
      const startDateStr = dateUtils.formatDate(couponData.startDate);
      const endDateStr = dateUtils.formatDate(couponData.endDate);

      const updatedCoupon = new Coupon(
        serverCoupon.code,
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
      await this.couponsService.update(updatedCoupon);

      this.toastService.add({
        id: 'update-coupon-success',
        variant: 'success',
        title: 'Coupon updated!',
        description: `Coupon ${updatedCoupon.code} updated successfully.`,
      });

      this.isUpdating.set(false);
      await this.router.navigate(this.urlService.getCouponsManageURL());
    } catch (error) {
      console.error(error);
      this.toastService.add({
        id: 'update-coupon-error',
        variant: 'error',
        title: 'Coupon was not updated!',
        description: 'An unexpected error occurred, please try again.',
      });
      this.isUpdating.set(false);
    }
  }

  get initialState(): CouponData | null {
    if (!this.coupon()) return null;

    const startDate = dateUtils.fromDateStringToDate(this.coupon()!.startDate);
    const endDate = dateUtils.fromDateStringToDate(this.coupon()!.endDate);
    const startTime = dateUtils.formatTime(startDate);
    const endTime = dateUtils.formatTime(endDate);

    return {
      code: this.coupon()!.code,
      name: this.coupon!.name,
      description: this.coupon()!.description,
      amount: this.coupon()!.amount,
      type: this.coupon()!.type,
      uses: this.coupon()!.uses,
      startDate,
      endDate,
      startTime,
      endTime,
    };
  }
}
