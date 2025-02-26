import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import {PageComponent} from '../../../components/page/page.component';
import {TableComponent} from '../../../components/table/table.component';
import {LinkButtonComponent} from '../../../components/link-button/link-button.component';
import {MenuComponent, MenuOption} from '../../../components/menu/menu.component';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {ConfirmationDialogService} from '../../../components/conformation-dialog/confirmation-dialog.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../components/toast/toast.service';
import {CouponsService} from '../../../services/coupons.service';
import {Coupon} from '../../../models/coupon.model';
import {TableColumn, TableGetIdFn} from '../../../components/table/table.component.types';
import {UrlService} from '../../../services/url.service';


enum CouponTableAction {
  Edit = 'edit',
  Delete = 'delete',
}

@Component({
  selector: 'manage-coupons-page',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    TableComponent,
    LinkButtonComponent,
    MenuComponent,
    CommonModule,
    LoaderComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ManageCouponsComponent implements OnInit {
  coupons = signal<Coupon[]>([]);
  isLoading = signal<boolean>(true);
  protected readonly CouponTableAction = CouponTableAction;

  constructor(
    private couponsService: CouponsService,
    private toastService: ToastService,
    private urlService: UrlService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  async fetchData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const fetchedCoupons = await this.couponsService.list();
      this.coupons.set(fetchedCoupons);
    } catch (error) {
      console.error('❌ Error fetching coupons:', error);
      this.toastService.add({
        id: 'fetch-coupons-error',
        variant: 'error',
        title: 'Error',
        description: 'Failed to fetch coupons.',
      });
    }
    this.isLoading.set(false);
  }

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  get columns(): TableColumn<Coupon>[] {
    return [
      {
        key: 'code',
        header: 'Code',
        sortable: true,
        renderCell: (coupon: Coupon) => coupon.code,
      },
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        renderCell: (coupon: Coupon) => coupon.name,
      },
      {
        key: 'description',
        header: 'Description',
        sortable: false,
        renderCell: (coupon: Coupon) => coupon.description,
      },
      {
        key: 'discount',
        header: 'Discount (%)',
        sortable: true,
        renderCell: (coupon: Coupon) => `${coupon.amount * 100}%`,
      },
    ];
  }

  getId: TableGetIdFn<Coupon> = (coupon) => coupon.code;

  getCouponEditPageURL(code :string){
    return this.urlService.getCouponEditPageURL(code)
  }

  getCouponAddPageURL(){
    return this.urlService.getCouponAddPageURL()
  }


  getCouponTableOptions(coupon: Coupon): MenuOption[] {
    const options: MenuOption[] = [];
    options.push({
      value: CouponTableAction.Edit,
      title: 'Edit',
      icon: 'edit',
      link: this.urlService.getCouponEditPageURL(coupon.code),
    });
    options.push({
      value: CouponTableAction.Delete,
      title: 'Delete',
      icon: 'delete',
      section: 'Danger',
      color: '#fa5252',
    });
    return options;
  }

  onOptionClicked(option: MenuOption, coupon: Coupon): void {
    if (option.value === CouponTableAction.Delete) {
      this.confirmationDialogService.show({
        title: 'Delete Coupon?',
        variant: 'warning',
        description: `Are you sure you want to delete coupon ${coupon.code}?`,
        onConfirm: async () => {
          try {
            await this.couponsService.delete(coupon.code);
            this.toastService.add({
              id: 'coupon-delete-success',
              title: 'Coupon Deleted',
              description: `Coupon ${coupon.code} has been deleted.`,
              variant: 'success',
            });
            await this.fetchData();
          } catch (error) {
            console.error(error);
            this.toastService.add({
              id: 'coupon-delete-error',
              title: 'Delete Failed',
              description: 'An error occurred while deleting the coupon.',
              variant: 'error',
            });
          }
        },
      });
    }
  }
}
