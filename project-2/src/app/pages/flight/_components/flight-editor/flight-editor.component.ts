import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  signal,
} from '@angular/core';
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
import { Flight } from '../../../../models/flight.model';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { dateUtils } from '../../../../utils/date-utils';

export interface FlightData {
  flightNumber: string;
  origin: string;
  destination: string;
  boardingArrival: {
    start: Date;
    end: Date;
    startTime: string;
    endTime: string;
  };
  seats: number;
}

@Component({
  selector: 'app-flight-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormInputComponent,
    FormSelectComponent,
    FormDateRangePickerComponent,
    ReactiveFormsModule,
    LoaderComponent,
    ButtonComponent,
  ],
  templateUrl: './flight-editor.component.html',
  styleUrls: ['./flight-editor.component.scss'],
})
export class FlightEditorComponent implements OnInit {
  @Input() initialState: Flight | null = null;
  @Input() isLoading = false;
  @Input() isEdit = false;
  @Output() onsave = new EventEmitter<FlightData>();

  form: FormGroup;
  destinationOptions = signal<{ value: string; label: string }[]>([]);
  isLoadingDestinations = signal<boolean>(true);

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
          startTime: new FormControl('', Validators.required),
          endTime: new FormControl('', Validators.required),
        }),

        seats: new FormControl(80, [
          Validators.required,
          Validators.min(50),
          Validators.max(150),
        ]),
      },
      {
        validators: [this.originDestinationValidator()],
      }
    );
  }

  async handleDestinations() {
    try {
      const fetchedDestinations = await this.destinationsService.list();
      const options = fetchedDestinations.map((des) => ({
        label: des.name,
        value: des.code,
      }));
      this.destinationOptions.set(options);
    } catch (error) {
      console.error('❌ Error fetching destination options:', error);
    }

    if (this.isEdit) {
      this.form.get('flightNumber')?.disable();
    }

    this.isLoadingDestinations.set(false);
  }

  async ngOnInit(): Promise<void> {
    if (this.initialState) {
      const boardingDate = dateUtils.fromDateStringToDate(
        this.initialState.boardingDate
      );
      const arrivalDate = dateUtils.fromDateStringToDate(
        this.initialState.arrivalDate
      );

      this.form.patchValue({
        flightNumber: this.initialState.flightNumber,
        origin: this.initialState.originCode,
        destination: this.initialState.destinationCode,
        seats: this.initialState.seatCount,
        boardingArrival: {
          start: boardingDate,
          end: arrivalDate,
          startTime: this.initialState.boardingTime,
          endTime: this.initialState.arrivalTime,
        },
      });
    }

    await this.handleDestinations();
  }

  save() {
    if (this.form.valid) {
      console.log('valid');

      this.onsave.emit({
        flightNumber: this.form.value.flightNumber,
        origin: this.form.value.origin,
        destination: this.form.value.destination,
        boardingArrival: this.form.value.boardingArrival,
        seats: this.form.value.seats,
      });
    } else {
      console.log('not valid');

      this.form.markAllAsTouched();
    }
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
}
