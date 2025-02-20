import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
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
import { PlaneType, PlaneTypeToInfo } from './flight-editor.consts';
import { PlaneInfoComponent } from './component/plane-info.component';

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
  planeType: PlaneType;
  price: number;
  seatCount: number;
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
    PlaneInfoComponent,
  ],
  templateUrl: './flight-editor.component.html',
  styleUrls: ['./flight-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlightEditorComponent implements OnInit {
  @Input() initialState: Flight | null = null;
  @Input() isLoading = false;
  @Input() isEdit = false;
  @Output() onsave = new EventEmitter<FlightData>();

  form: FormGroup;
  destinationOptions = signal<{ value: string; label: string }[]>([]);
  isLoadingDestinations = signal<boolean>(true);

  planeOptions = Object.entries(PlaneTypeToInfo).map(([value, info]) => ({
    label: `${info.name} (${info.seatCount} seats)`,
    value,
  }));

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

        planeType: new FormControl('', [Validators.required]),
        price: new FormControl(100, [
          Validators.required,
          Validators.min(10),
          Validators.max(Number.MAX_SAFE_INTEGER),
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
      this.form.get('planeType')?.disable();
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
        planeType: this.initialState.planeType,
        origin: this.initialState.originCode,
        destination: this.initialState.destinationCode,
        boardingArrival: {
          start: boardingDate,
          end: arrivalDate,
          startTime: this.initialState.boardingTime,
          endTime: this.initialState.arrivalTime,
        },
        price: this.initialState.price,
      });
    }

    await this.handleDestinations();
  }

  save() {
    if (this.form.valid) {
      const planeType =
        this.form.value.planeType ?? this.initialState?.planeType;
      if (!planeType) return;

      const flightInfo = PlaneTypeToInfo[planeType as PlaneType];

      this.onsave.emit({
        flightNumber:
          this.form.value.flightNumber ?? this.initialState?.flightNumber,
        origin: this.form.value.origin,
        destination: this.form.value.destination,
        boardingArrival: this.form.value.boardingArrival,
        planeType: this.form.value.planeType,
        price: this.form.value.price,
        seatCount: flightInfo.seatCount,
      });
    } else {
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
