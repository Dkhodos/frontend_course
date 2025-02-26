import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Flight } from '../../../../../../../models/flight.model';
import Passenger from '../../../../../../../models/passenger.model';
import { SeatSelectorComponent } from './components/seat-selector/seat-selector.component';
import { FormControl } from '@angular/forms';
import { SeatSummaryItem } from './components/seat-selector/seat-selector.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seats-step',
  standalone: true,
  templateUrl: './seats-step.component.html',
  imports: [MatIcon, MatButton, SeatSelectorComponent],
  styleUrls: ['./seats-step.component.scss'],
})
export class SeatsStepComponent implements OnInit, OnDestroy {
  @Input() stepper!: MatStepper;
  @Input() flight!: Flight;
  @Input() passengers: Passenger[] = [];
  @Input() seatsControl!: FormControl<Record<string, SeatSummaryItem>>;

  seatCurrentPassengerId: string | null = null;
  private stepperSubscription!: Subscription;

  ngOnInit(): void {
    if (this.stepper) {
      this.stepperSubscription = this.stepper.selectionChange.subscribe(
        (event) => {
          if (
            event.selectedIndex === 2 &&
            this.seatCurrentPassengerId === null &&
            this.passengers.length > 0
          ) {
            this.seatCurrentPassengerId = this.passengers[0].passportNumber;
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.stepperSubscription?.unsubscribe();
  }

  onChangeCurrentPassengerId(passengerId: string) {
    this.seatCurrentPassengerId = passengerId;
  }
}
