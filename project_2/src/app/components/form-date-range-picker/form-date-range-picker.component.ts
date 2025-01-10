import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-date-range-picker',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-date-range-picker.component.html',
  styleUrls: ['./form-date-range-picker.component.scss'],
})
export class FormDateRangePickerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = 'Date Range';
  @Input() startPlaceholder = 'Start Date';
  @Input() endPlaceholder = 'End Date';
  @Input() required = false;
  @Input() errorMessages?: Record<string, string>;

  protected parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get rangeGroup(): FormGroup {
    return this.parentFormGroup.get(this.controlKey) as FormGroup;
  }

  ngOnInit(): void {
    if (!this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.addControl(
        this.controlKey,
        new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
          startTime: new FormControl(''),
          endTime: new FormControl(''),
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }

  get rangeErrorMessage(): string {
    const startErrors = this.getStartErrorMessage();
    const endErrors = this.getEndErrorMessage();

    const totalErrors = Array.from(new Set([startErrors, endErrors]));

    return totalErrors.join(', ');
  }

  get hasRangeErrorMessage() {
    return this.startHasError() || this.endHasError();
  }

  private startHasError(): boolean {
    const c = this.rangeGroup.get('start');
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  private getStartErrorMessage(): string {
    const c = this.rangeGroup.get('start');
    if (!c || !c.errors) return '';
    for (const key in c.errors) {
      if (this.errorMessages && this.errorMessages[key])
        return this.errorMessages[key];
      if (key === 'required') return 'Start date is required';
      if (key === 'matStartDateInvalid') return 'Invalid start date';
    }
    return '';
  }

  private endHasError(): boolean {
    const c = this.rangeGroup.get('end');
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  private getEndErrorMessage(): string {
    const c = this.rangeGroup.get('end');
    if (!c || !c.errors) return '';
    for (const key in c.errors) {
      if (this.errorMessages && this.errorMessages[key])
        return this.errorMessages[key];
      if (key === 'required') return 'End date is required';
      if (key === 'matEndDateInvalid') return 'Invalid end date';
    }
    return '';
  }

  get startTimeHasError(): boolean {
    const c = this.rangeGroup.get('startTime');
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  get startTimeErrorMessage(): string {
    const c = this.rangeGroup.get('startTime');
    if (!c || !c.errors) return '';
    for (const key in c.errors) {
      if (this.errorMessages && this.errorMessages[key])
        return this.errorMessages[key];
      if (key === 'required') return 'Start time is required';
    }
    return '';
  }

  get endTimeHasError(): boolean {
    const c = this.rangeGroup.get('endTime');
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  get endTimeErrorMessage(): string {
    const c = this.rangeGroup.get('endTime');
    if (!c || !c.errors) return '';
    for (const key in c.errors) {
      if (this.errorMessages && this.errorMessages[key])
        return this.errorMessages[key];
      if (key === 'required') return 'End time is required';
    }
    return '';
  }
}
