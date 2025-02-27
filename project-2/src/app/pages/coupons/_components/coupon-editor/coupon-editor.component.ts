import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../../../components/form-input/form-input.component';
import { FormTextareaComponent } from '../../../../components/form-textarea/form-textarea.component';
import { FormSelectComponent } from '../../../../components/form-select/form-select.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { CouponType } from '../../../../models/coupon.model';
import { FormDateRangePickerComponent } from '../../../../components/form-date-range-picker/form-date-range-picker.component';

export interface CouponData {
  code: string;
  name: string;
  description: string;
  amount: number; // if Percentage, normalized (0-1); if Fixed, as entered
  uses: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  type: CouponType;
}

@Component({
  selector: 'app-coupon-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormTextareaComponent,
    FormSelectComponent,
    ButtonComponent,
    FormDateRangePickerComponent,
  ],
  templateUrl: './coupon-editor.component.html',
  styleUrls: ['./coupon-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CouponEditorComponent implements OnInit {
  @Input() initialState: CouponData | null = null;
  @Input() isLoading = false;
  @Input() isEdit = false;
  @Output() save = new EventEmitter<CouponData>();

  form: FormGroup;

  // Options for the coupon type select
  public couponTypeOptions = [
    { value: CouponType.Percentage, label: 'Percentage' },
    { value: CouponType.Amount, label: 'Fixed Amount' },
  ];

  constructor() {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{4,8}$/),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.maxLength(256)]),
      amount: new FormControl(15, [Validators.required, Validators.min(1)]),
      uses: new FormControl(100, [Validators.required, Validators.min(1)]),
      dateRange: new FormGroup({
        start: new FormControl(null, [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        end: new FormControl(null, [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
      }),
      type: new FormControl(CouponType.Percentage, [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.initialState) {
      const amountValue =
        this.initialState.type === CouponType.Percentage
          ? this.initialState.amount * 100
          : this.initialState.amount;
      this.form.patchValue({
        code: this.initialState.code,
        name: this.initialState.name,
        description: this.initialState.description,
        amount: amountValue,
        uses: this.initialState.uses,
        dateRange: {
          start: this.initialState.startDate,
          startTime: this.initialState.startTime,
          end: this.initialState.endDate,
          endTime: this.initialState.endTime,
        },
        type: this.initialState.type,
      });
      if (this.isEdit) {
        this.form.get('code')?.disable();
      }
    }
  }

  submit(): void {
    if (this.form.valid) {
      // Use getRawValue() so that disabled controls (like code in edit mode) are included
      const formValue = this.form.getRawValue();
      const couponData: CouponData = {
        code: formValue.code,
        name: formValue.name,
        description: formValue.description,
        // For Percentage type, convert from percentage to decimal; otherwise, leave as entered
        amount:
          formValue.type === CouponType.Percentage
            ? formValue.amount / 100
            : formValue.amount,
        uses: formValue.uses,
        startDate: formValue.dateRange.start,
        startTime: formValue.dateRange.startTime,
        endDate: formValue.dateRange.end,
        endTime: formValue.dateRange.endTime,
        type: formValue.type,
      };
      this.save.emit(couponData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  get amountLabel() {
    if (this.form.get('type')?.value === CouponType.Percentage) {
      return 'Discount Amount (%)';
    }
    return 'Discount Amount ($)';
  }

  get amountMax() {
    if (this.form.get('type')?.value === CouponType.Percentage) {
      return 100;
    }
    return 10_000;
  }
}
