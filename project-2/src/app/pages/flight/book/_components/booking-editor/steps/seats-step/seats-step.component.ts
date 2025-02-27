import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Flight } from '../../../../../../../models/flight.model';
import { SeatSelectorComponent } from './components/seat-selector/seat-selector.component';
import { Subscription } from 'rxjs';
import { BookingFormService } from '../../services/booking-form.service';

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

  private stepperSubscription!: Subscription;

  constructor(private bookingFormService: BookingFormService) {}

  ngOnInit(): void {
    if (this.stepper) {
      this.stepperSubscription = this.stepper.selectionChange.subscribe(
        (event) => {
          if (
            event.selectedIndex !== 1 ||
            this.bookingFormService.passengers.length == 0 ||
            this.bookingFormService.getCurrentSeatPassengerId()
          )
            return;

          const firstPassenger = this.bookingFormService.passengers.at(0);
          const passportId = firstPassenger.get('passportId')?.value;
          if (passportId) {
            this.bookingFormService.setCurrentSeatPassengerId(passportId);
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.stepperSubscription?.unsubscribe();
  }
}
