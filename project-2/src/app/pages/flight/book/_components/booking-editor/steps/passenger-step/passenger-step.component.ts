import { Component, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { MatButton } from '@angular/material/button';
import { StepDescriptionComponent } from '../../components/step-description/step-description';

@Component({
  selector: 'app-passenger-step',
  standalone: true,
  imports: [
    PassengerListComponent,
    MatIcon,
    MatButton,
    StepDescriptionComponent,
  ],
  templateUrl: './passenger-step.component.html',
  styleUrls: ['./passenger-step.component.scss'],
})
export class PassengerStepComponent {
  @Input() stepper!: MatStepper;
}
