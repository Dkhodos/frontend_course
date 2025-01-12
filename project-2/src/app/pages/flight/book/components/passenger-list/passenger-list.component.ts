import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  PassengerForm,
  PassengerItemComponent,
} from './components/passenger-item/passenger-item.component';
import { MatButton } from '@angular/material/button';

export interface FlightBookForm {
  passengers: FormArray<FormGroup<PassengerForm>>;
}

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    PassengerItemComponent,
    MatButton,
  ],
  templateUrl: './passenger-list.component.html',
  styleUrl: './passenger-list.component.scss',
})
export class PassengerListComponent {
  @Input() passengers!: FormArray<FormGroup<PassengerForm>>;

  constructor(private fb: FormBuilder) {}

  addPassenger() {
    const passengerGroup = this.fb.group<PassengerForm>({
      firstName: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      passportId: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required, this.israeliPassportValidator],
      }),
    });
    this.passengers.push(passengerGroup);
  }

  israeliPassportValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const regex = /^[0-9]{9}$/;
    return regex.test(value) ? null : { invalidIsraeliPassport: true };
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }
}
