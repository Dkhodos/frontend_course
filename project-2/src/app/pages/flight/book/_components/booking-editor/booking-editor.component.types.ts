import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import { SeatSummaryItem } from './steps/seats-step/components/seat-selector/seat-selector.types';

export interface FlightBookForm {
  passengers: FormArray<FormGroup<PassengerForm>>;
  seats: FormControl<SeatSummaryItem[]>;
}
