import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { BaggageCounterComponent } from './components/baggage-counter/baggage-counter.component';
import { BaggageSummaryComponent } from './components/baggage-summary/baggage-summary.component';
import { BaggageEditorService } from './baggage-editor.service';
import { BookingFormService } from '../../../services/booking-form.service';
import { Baggage } from '../../../../../../../../models/passenger.model';
import { PassengerSelectionComponent } from '../../../components/passenger-selection/passenger-selection.component';
import { BAGGAGE_TYPE_TO_DESCRIPTION } from './components/baggage-counter/baggage-counter.component.const';

@Component({
  selector: 'app-baggage-editor',
  standalone: true,
  templateUrl: './baggage-editor.component.html',
  styleUrls: ['./baggage-editor.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatExpansionModule,
    MatIcon,
    BaggageCounterComponent,
    BaggageSummaryComponent,
    PassengerSelectionComponent,
  ],
})
export class BaggageEditorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private subscription?: Subscription;

  baggageTypes = [Baggage.Small, Baggage.Medium, Baggage.Large];
  baggageDescriptions = BAGGAGE_TYPE_TO_DESCRIPTION;

  constructor(
    private bookingFormService: BookingFormService,
    private baggageService: BaggageEditorService
  ) {
    this.form = new FormGroup({
      small: new FormControl(0, [Validators.min(0)]),
      medium: new FormControl(0, [Validators.min(0)]),
      large: new FormControl(0, [Validators.min(0)]),
    });

    effect(() => {
      if (!this.bookingFormService.currentPassengerBaggageId()) return;
      this.selectPassenger();
    });
  }

  ngOnInit() {
    // Whenever the local form changes, update the current passenger's baggage in the service.
    this.subscription = this.form.valueChanges.subscribe(() => {
      const currentPassengerId =
        this.bookingFormService.getCurrentBaggagePassengerId();
      console.log('currentPassengerId', currentPassengerId);
      if (!currentPassengerId) return;

      const passengerGroup =
        this.bookingFormService.getCurrentBaggagePassenger();
      console.log('currentPassengerId', currentPassengerId);
      if (!passengerGroup) return;

      const items = this.getBaggageFromForm();

      if (
        !this.baggageService.validate(
          currentPassengerId,
          this.form,
          this.getAllPassengers()
        )
      ) {
        return;
      }

      passengerGroup.get('baggage')?.setValue(items);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private selectPassenger(): void {
    const passengerGroup = this.bookingFormService.getCurrentBaggagePassenger();
    if (!passengerGroup) return;

    const baggage = passengerGroup.get('baggage')?.value || [];
    const smallCount = baggage.filter(
      (b: string) => b === Baggage.Small
    ).length;
    const mediumCount = baggage.filter(
      (b: string) => b === Baggage.Medium
    ).length;
    const largeCount = baggage.filter(
      (b: string) => b === Baggage.Large
    ).length;

    this.form.patchValue({
      small: smallCount,
      medium: mediumCount,
      large: largeCount,
    });
  }

  // Helper: get raw passenger data from the service.
  private getAllPassengers() {
    return this.bookingFormService.passengers.controls.map(
      (group) => group.value
    );
  }

  // Use the service’s computed summary.
  get baggageSummary() {
    return this.bookingFormService.getBaggageSummary();
  }

  get currentPassengerId() {
    return this.bookingFormService.getCurrentBaggagePassengerId();
  }

  private getBaggageFromForm() {
    // Build the baggage items array based on local counts.
    const small = Number(this.form.get('small')?.value ?? 0);
    const medium = Number(this.form.get('medium')?.value ?? 0);
    const large = Number(this.form.get('large')?.value ?? 0);

    const items: Baggage[] = [
      ...Array(small).fill(Baggage.Small),
      ...Array(medium).fill(Baggage.Medium),
      ...Array(large).fill(Baggage.Small),
    ];

    return items;
  }
}
