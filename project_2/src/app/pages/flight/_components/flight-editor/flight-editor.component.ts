import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../../../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../../../components/form-select/form-select.component';
import { FormDateRangePickerComponent } from '../../../../components/form-date-range-picker/form-date-range-picker.component';
import { DestinationsService } from '../../../../services/destinations.service';

@Component({
  selector: 'app-flight-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormInputComponent,
    FormSelectComponent,
    FormDateRangePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './flight-editor.component.html',
  styleUrls: ['./flight-editor.component.scss'],
})
export class FlightEditorComponent implements OnInit {
  @Input() initialState: { flightNumber?: string } = {};
  @Output() saveEvent = new EventEmitter<{
    flightNumber: string;
    origin: string;
    destination: string;
    boardingArrival: {
      start: string | null;
      end: string | null;
    };
    seats: number;
  }>();

  form: FormGroup;
  destinationOptions: { value: string; label: string }[] = [];

  constructor(private destinationsService: DestinationsService) {
    this.form = new FormGroup(
      {
        flightNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{2,6}$/i),
        ]),
        origin: new FormControl('', Validators.required),
        destination: new FormControl('', Validators.required),

        boardingArrival: new FormGroup({
          start: new FormControl('', Validators.required),
          end: new FormControl('', Validators.required),
        }),

        seats: new FormControl(1, [
          Validators.required,
          Validators.min(1),   // can't be less than 1
          Validators.max(100), // can't be more than 100
        ]),
      },
      {
        validators: [this.originDestinationValidator()],
      }
    );
  }

  ngOnInit(): void {
    if (this.initialState.flightNumber) {
      this.form.patchValue({ flightNumber: this.initialState.flightNumber });
    }
    this.destinationOptions = this.destinationsService.options();
  }

  save() {
    if (this.form.valid) {
      this.saveEvent.emit({
        flightNumber: this.form.value.flightNumber,
        origin: this.form.value.origin,
        destination: this.form.value.destination,
        boardingArrival: this.form.value.boardingArrival,
        seats: this.form.value.seats,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get filteredDestinationOptions() {
    const originValue = this.form.get('origin')?.value;
    return this.destinationOptions.filter((opt) => opt.value !== originValue);
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
}
