import { Component, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-seats-step',
  standalone: true,
  templateUrl: './seats-step.component.html',
  imports: [MatIcon, MatButton],
  styleUrls: ['./seats-step.component.scss'],
})
export class SeatsStepComponent {
  @Input() stepper!: MatStepper;
}
