import { Component, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Flight } from '../../../../../../../models/flight.model';
import Passenger from '../../../../../../../models/passenger.model';
import { SeatSelectorComponent } from './components/seat-selector/seat-selector.component';
import {FormControl} from "@angular/forms";
import {SeatSummaryItem} from "./components/seat-selector/seat-selector.types";

@Component({
  selector: 'app-seats-step',
  standalone: true,
  templateUrl: './seats-step.component.html',
  imports: [MatIcon, MatButton, SeatSelectorComponent],
  styleUrls: ['./seats-step.component.scss'],
})
export class SeatsStepComponent {
  @Input() stepper!: MatStepper;
  @Input() flight!: Flight;
  @Input() passengers: Passenger[] = [];
  @Input() seatsControl!: FormControl<Record<string, SeatSummaryItem>>
}
