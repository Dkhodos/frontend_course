import { Component, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-baggage-step',
  standalone: true,
  templateUrl: './baggage-step.component.html',
  styleUrls: ['./baggage-step.component.scss'],
  imports: [MatIcon, MatButton],
})
export class BaggageStepComponent {
  @Input() stepper!: MatStepper;
}
