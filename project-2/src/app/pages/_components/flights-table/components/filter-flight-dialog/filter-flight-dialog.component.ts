import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {
  FormSelectComponent,
  Option,
} from '../../../../../components/form-select/form-select.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormDateRangePickerComponent } from '../../../../../components/form-date-range-picker/form-date-range-picker.component';
import { MatIcon } from '@angular/material/icon';
import { DestinationsService } from '../../../../../services/destinations.service';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';

export interface FlightFilterData {
  origin?: string;
  destination?: string;
  boardingArrival?: {
    start?: string;
    end?: string;
  };
}

@Component({
  selector: 'app-book-filter-modal',
  templateUrl: './filter-flight-dialog.component.html',
  styleUrls: ['./filter-flight-dialog.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormSelectComponent,
    ReactiveFormsModule,
    FormDateRangePickerComponent,
    MatIcon,
    LoaderComponent,
    CommonModule,
  ],
})
export class FilterFlightDialogComponent implements OnInit {
  form: FormGroup;

  isLoading = true;
  destinationOptions = signal<Option[]>([]);

  constructor(
    private destinationsService: DestinationsService,
    public dialogRef: MatDialogRef<FilterFlightDialogComponent>
  ) {
    this.form = new FormGroup(
      {
        flightNumber: new FormControl('', [
          Validators.pattern(/^[A-Z0-9]{2,6}$/i),
        ]),
        origin: new FormControl(''),
        destination: new FormControl(''),

        boardingArrival: new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
        }),

        seats: new FormControl('', [Validators.min(0), Validators.max(100)]),
      },
      {
        validators: [
          this.originDestinationValidator(),
          this.atLeastOneFilterValidator(),
        ],
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.fetchDestinations();
  }

  async fetchDestinations() {
    this.isLoading = true;
    try {
      const fetchedDestinations = await this.destinationsService.list();
      const options = fetchedDestinations.map((des) => ({
        label: des.name,
        value: des.code,
      }));
      this.destinationOptions.set(options);
    } catch (error) {
      console.error('❌ Error fetching destinations:', error);
    }

    this.isLoading = false;
  }

  get filteredDestinationOptions() {
    const originValue = this.form.get('origin')?.value;
    return this.destinationOptions().filter((opt) => opt.value !== originValue);
  }

  private originDestinationValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const origin = group.get('origin')?.value;
      const destination = group.get('destination')?.value;
      if (origin && destination && origin === destination) {
        return { sameDestination: true };
      }
      return null;
    };
  }

  private atLeastOneFilterValidator() {
    return (group: AbstractControl) => {
      const origin = group.get('origin')?.value;
      const destination = group.get('destination')?.value;
      const boardingGroup = group.get('boardingArrival') as FormGroup;
      if (!boardingGroup) {
        return null;
      }

      const start = boardingGroup.get('start')?.value;
      const end = boardingGroup.get('end')?.value;

      if (!origin && !destination && !start && !end) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value as FlightFilterData);
    }
  }
}
