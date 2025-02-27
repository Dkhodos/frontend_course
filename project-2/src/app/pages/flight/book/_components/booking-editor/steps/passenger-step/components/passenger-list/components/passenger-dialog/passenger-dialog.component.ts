import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../../../../../../../components/form-input/form-input.component';
import { MatButton } from '@angular/material/button';
import {
  BookingFormPassenger,
  BookingFormService,
} from '../../../../../../services/booking-form.service';

interface DialogInitialState {
  passenger: BookingFormPassenger;
}

@Component({
  selector: 'app-passenger-dialog',
  templateUrl: './passenger-dialog.component.html',
  styleUrls: ['./passenger-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
  ],
})
export class PassengerDialogComponent {
  passengerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingFormService: BookingFormService,
    public dialogRef: MatDialogRef<PassengerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInitialState
  ) {
    this.passengerForm = this.fb.group({
      firstName: [data?.passenger?.firstName || '', Validators.required],
      lastName: [data?.passenger?.lastName || '', Validators.required],
      passportId: [
        data?.passenger?.passportId || '',
        [Validators.required, Validators.pattern(/^\d{8}$/)],
        this.uniquePassportIdValidator,
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.passengerForm.valid) {
      this.dialogRef.close(this.passengerForm.value);
    }
  }

  uniquePassportIdValidator = async (control: AbstractControl) => {
    if (!(control instanceof FormControl)) return null;

    const currentId = control.value;

    const passportIds = this.bookingFormService.passengers.controls
      .map((group: AbstractControl) => group.get('passportId')?.value)
      .filter((id) => id !== null && id !== undefined && id !== '');

    if (passportIds.includes(currentId)) {
      return { duplicatePassportIds: true };
    }

    return null;
  };
}
