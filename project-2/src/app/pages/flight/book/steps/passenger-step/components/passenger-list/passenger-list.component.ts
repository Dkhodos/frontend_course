import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  PassengerForm,
  PassengerItemComponent,
} from './components/passenger-item/passenger-item.component';
import { MatButton } from '@angular/material/button';

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
        validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
      }),
    });
    this.passengers.push(passengerGroup);
  }

  removePassenger(index: number) {
    this.passengers.removeAt(index);
  }
}
