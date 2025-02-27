import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import { SeatSummaryItem } from './steps/seats-step/components/seat-selector/seat-selector.types';
import { SingleBaggageSummary } from './steps/baggage-step/baggage-editor/components/baggage-counter/baggage-counter.component.types';

export type BaggageForm = Record<string, SingleBaggageSummary>;

export interface FlightBookForm {
  passengers: FormArray<FormGroup<PassengerForm>>;
  seats: FormControl<Record<string, SeatSummaryItem>>;
  baggage: FormControl<BaggageForm>;
}
