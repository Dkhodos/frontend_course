import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { PassengerItemComponent } from './components/passenger-item/passenger-item.component';
import { BookingFormService } from '../../../../services/booking-form.service';
import { MatDialog } from '@angular/material/dialog';
import { PassengerDialogComponent } from './components/passenger-dialog/passenger-dialog.component';

@Component({
  selector: 'app-passenger-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    PassengerItemComponent,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
})
export class PassengerListComponent {
  constructor(
    public bookingFormService: BookingFormService,
    private dialog: MatDialog
  ) {}

  // Expose the passengers FormArray from the service.
  get passengers(): FormArray {
    return this.bookingFormService.passengers;
  }

  // Typed getter for the FormGroups.
  get passengerGroups(): FormGroup[] {
    return this.passengers.controls as FormGroup[];
  }

  // Open the dialog to add a new passenger.
  openAddPassengerDialog(): void {
    const dialogRef = this.dialog.open(PassengerDialogComponent, {
      width: '400px',
      data: {}, // Optionally pass data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add the new passenger data from the dialog.
        this.bookingFormService.addPassenger(result);
      }
    });
  }

  removePassenger(index: number): void {
    this.bookingFormService.removePassenger(index);
  }

  editPassenger(index: number): void {
    const passengerGroup = this.passengerGroups[index];
    const dialogRef = this.dialog.open(PassengerDialogComponent, {
      width: '400px',
      data: { passenger: passengerGroup.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the existing passenger form group with the new values.
        passengerGroup.patchValue(result);
      }
    });
  }
}
