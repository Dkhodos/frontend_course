import { Component, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  templateUrl: './summary-step.component.html',
  imports: [MatIcon, MatButton],
  styleUrls: ['./summary-step.component.scss'],
})
export class SummaryStepComponent {
  @Input() stepper!: MatStepper;

  onBook(): void {
    console.log('Booking flight...');
    // TODO: Implement your booking logic here.
  }
}
