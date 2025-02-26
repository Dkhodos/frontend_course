import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import Passenger, {
  Baggage,
} from '../../../../../../../../models/passenger.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaggageForm } from '../../../booking-editor.component.types';
import { PassengerSelectionComponent } from '../../../components/passenger-selection/passenger-selection.component';
import { BaggageCounterComponent } from './components/baggage-counter/baggage-counter.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  BAGGAGE_LIMIT_PER_PASSENGER,
  BAGGAGE_TYPE_TO_CONTROL_KEY,
  BAGGAGE_TYPE_TO_DESCRIPTION,
} from './components/baggage-counter/baggage-counter.component.const';
import { MatIcon } from '@angular/material/icon';
import { SingleBaggageSummary } from './components/baggage-counter/baggage-counter.component.types';
import { BaggageSummaryComponent } from './components/baggage-summary/baggage-summary.component';
import { BaggageEditorService } from './baggage-editor.service';
import tick from '../../../../../../../../utils/tick';

@Component({
  selector: 'app-baggage-editor',
  standalone: true,
  templateUrl: './baggage-editor.component.html',
  styleUrls: ['./baggage-editor.component.scss'],
  imports: [
    PassengerSelectionComponent,
    ReactiveFormsModule,
    BaggageCounterComponent,
    CommonModule,
    MatExpansionModule,
    MatIcon,
    BaggageSummaryComponent,
  ],
})
export class BaggageEditorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() passengers!: Passenger[];
  @Input() baggageControl!: FormControl<BaggageForm>;
  @Input() seatCurrentPassengerId: string | null = null;
  @Output() changeCurrentPassengerId = new EventEmitter<string>();

  baggageTypes = Object.values(Baggage) as Baggage[];
  baggageDescriptions = BAGGAGE_TYPE_TO_DESCRIPTION;
  baggageControlKeys = BAGGAGE_TYPE_TO_CONTROL_KEY;

  form: FormGroup;
  private subscription?: Subscription;

  selectPassenger(passengerId: string): void {
    this.changeCurrentPassengerId.emit(passengerId);
  }

  constructor(private baggageService: BaggageEditorService) {
    this.form = new FormGroup({
      small: new FormControl(0, [
        Validators.min(0),
        Validators.max(BAGGAGE_LIMIT_PER_PASSENGER),
      ]),
      medium: new FormControl(0, [
        Validators.min(0),
        Validators.max(BAGGAGE_LIMIT_PER_PASSENGER),
      ]),
      large: new FormControl(0, [
        Validators.min(0),
        Validators.max(BAGGAGE_LIMIT_PER_PASSENGER),
      ]),
    });
  }

  ngOnInit() {
    this.subscription = this.form.valueChanges.subscribe(() => {
      if (!this.seatCurrentPassengerId) return;

      const baggage = this.baggageControl.getRawValue();
      const items = [
        ...this.getBaggageItems(
          this.form.get('small')?.value ?? 0,
          Baggage.Small
        ),
        ...this.getBaggageItems(
          this.form.get('medium')?.value ?? 0,
          Baggage.Medium
        ),
        ...this.getBaggageItems(
          this.form.get('large')?.value ?? 0,
          Baggage.Large
        ),
      ];

      const passenger = this.passengers.find(
        (p) => p.passportNumber === this.seatCurrentPassengerId
      );

      const baggageData: BaggageForm = {
        [this.seatCurrentPassengerId]: {
          items,
          price: this.getBaggagePrice(items),
          passengerName: passenger?.name ?? '',
          passportNumber: passenger?.passportNumber ?? '',
          itemsExplain: this.getItemsExplain(items),
        },
      };

      if (
        !this.baggageService.validate(
          this.seatCurrentPassengerId,
          this.form,
          this.passengers
        )
      ) {
        return;
      }

      this.baggageControl.patchValue({ ...baggage, ...baggageData });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['seatCurrentPassengerId'] && this.seatCurrentPassengerId) {
      tick(() => {
        this.baggageService.getStateFromPassengers(
          this.passengers,
          changes['seatCurrentPassengerId'].currentValue,
          this.form
        );
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  get baggageSummary(): SingleBaggageSummary[] {
    const baggage = this.baggageControl.getRawValue();

    return this.passengers.map((p) => ({
      passengerName: p.name,
      passportNumber: p.passportNumber,
      items: baggage[p.passportNumber]?.items ?? [],
      price: this.getBaggagePrice(baggage[p.passportNumber]?.items ?? []),
      itemsExplain: this.getItemsExplain(
        baggage[p.passportNumber]?.items ?? []
      ),
    }));
  }

  private getBaggageItems(count: number, type: Baggage) {
    return Array(count).fill(type);
  }

  private getBaggagePrice(types: Baggage[]) {
    return types.reduce((current, item) => {
      return current + BAGGAGE_TYPE_TO_DESCRIPTION[item].price;
    }, 0);
  }

  private getItemsExplain(types: Baggage[]) {
    return this.baggageService.getItemsExplain(types);
  }
}
