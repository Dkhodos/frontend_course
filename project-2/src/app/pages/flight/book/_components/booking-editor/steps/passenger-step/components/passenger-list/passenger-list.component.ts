import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PassengerItemComponent } from './components/passenger-item/passenger-item.component';
import { BookingFormService } from '../../../../services/booking-form.service';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    PassengerItemComponent,
    MatButtonModule,
  ],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
})
export class PassengerListComponent {
  constructor(public bookingFormService: BookingFormService) {}

  // Expose the passengers FormArray from the service.
  get passengers(): FormArray {
    return this.bookingFormService.passengers;
  }

  // Create a typed getter that casts the controls to FormGroup[]
  get passengerGroups(): FormGroup[] {
    return this.passengers.controls as FormGroup[];
  }

  addPassenger(): void {
    this.bookingFormService.addPassenger();
  }

  removePassenger(index: number): void {
    this.bookingFormService.removePassenger(index);
  }
}
