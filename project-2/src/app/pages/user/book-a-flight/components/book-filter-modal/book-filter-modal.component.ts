import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FormInputComponent } from '../../../../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../../../../components/form-select/form-select.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDateRangePickerComponent } from '../../../../../components/form-date-range-picker/form-date-range-picker.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-book-filter-modal',
  templateUrl: './book-filter-modal.component.html',
  styleUrls: ['./book-filter-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormInputComponent,
    FormSelectComponent,
    ReactiveFormsModule,
    FormDateRangePickerComponent,
    MatIcon,
  ],
})
export class BookFilterModalComponent {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<BookFilterModalComponent>) {
    this.form = new FormGroup({
      flightNumber: new FormControl('', [
        Validators.pattern(/^[A-Z0-9]{2,6}$/i),
      ]),
      origin: new FormControl(''),
      destination: new FormControl(''),

      boardingArrival: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
      }),

      seats: new FormControl('', [Validators.min(0), Validators.max(100)]),
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
