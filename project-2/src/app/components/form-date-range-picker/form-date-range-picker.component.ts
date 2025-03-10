import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
  input,
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
import { DATE_FORMATS } from '../../adapter/appDateAdapter';

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
  dateFormat = DATE_FORMATS.parse.dateInput;

  @Input({ required: true }) controlKey = '';
  @Input() label = 'Date Range';
  @Input() startPlaceholder = 'Start Date';
  @Input() endPlaceholder = 'End Date';
  @Input() required = false;
  @Input() errorMessages?: Record<string, string>;
  @Input() timeSelector = true;

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
