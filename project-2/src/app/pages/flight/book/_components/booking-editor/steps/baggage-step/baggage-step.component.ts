import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
import Passenger from '../../../../../../../models/passenger.model';
import { FormControl } from '@angular/forms';
import { BaggageForm } from '../../booking-editor.component.types';
import { BaggageEditorComponent } from './baggage-editor/baggage-editor.component';

@Component({
  selector: 'app-baggage-step',
  standalone: true,
  templateUrl: './baggage-step.component.html',
  styleUrls: ['./baggage-step.component.scss'],
  imports: [MatIcon, MatButton, BaggageEditorComponent],
})
export class BaggageStepComponent implements OnInit, OnDestroy {
  @Input() stepper!: MatStepper;
  @Input() passengers: Passenger[] = [];
  @Input() baggageControl!: FormControl<BaggageForm>;

  seatCurrentPassengerId: string | null = null;
  private stepperSubscription!: Subscription;

  ngOnInit(): void {
    if (this.stepper) {
      this.stepperSubscription = this.stepper.selectionChange.subscribe(
        (event) => {
          if (
            event.selectedIndex === 1 &&
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
