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
import { ButtonComponent } from '../../../../components/button/button.component';
import {percentage} from '@angular/fire/storage';

export interface CouponData {
  code: string;
  name: string;
  description: string;
  amount: number; // normalized between 0 and 1
}

@Component({
  selector: 'app-coupon-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    FormTextareaComponent,
    ButtonComponent,
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

  constructor() {
    this.form = new FormGroup({
      // Coupon code: 4-8 alphanumeric characters
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{4,8}$/),
      ]),
      // Coupon name: required
      name: new FormControl('', [Validators.required]),
      // Description: required, max length 256
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
      ]),
      // Discount amount: using the slider component, value between 0-100; 0 not allowed
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    if (this.initialState) {
      // Assume that initialState.amount is a decimal (0-1) so convert to percentage (0-100)
      this.form.patchValue({
        code: this.initialState.code,
        name: this.initialState.name,
        description: this.initialState.description,
        amount: this.initialState.amount * 100,
      });
      if (this.isEdit) {
        this.form.get('code')?.disable();
      }
    }
  }

  submit(): void {
    if (this.form.valid) {
      // Get form values; if control was disabled, use getRawValue() to include it.
      const formValue = this.form.getRawValue();
      // Convert the discount amount from percentage to decimal
      const couponData: CouponData = {
        code: formValue.code,
        name: formValue.name,
        description: formValue.description,
        amount: formValue.amount / 100,
      };
      this.save.emit(couponData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  protected readonly percentage = percentage;
}
