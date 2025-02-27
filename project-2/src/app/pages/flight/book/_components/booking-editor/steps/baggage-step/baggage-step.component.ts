import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { BookingFormService } from '../../services/booking-form.service';
import { BaggageEditorComponent } from './baggage-editor/baggage-editor.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-baggage-step',
  standalone: true,
  templateUrl: './baggage-step.component.html',
  styleUrls: ['./baggage-step.component.scss'],
  imports: [BaggageEditorComponent, MatIcon, MatButton],
  encapsulation: ViewEncapsulation.None,
})
export class BaggageStepComponent implements OnInit, OnDestroy {
  @Input() stepper!: MatStepper;
  private stepperSubscription!: Subscription;

  constructor(private bookingFormService: BookingFormService) {}

  ngOnInit(): void {
    if (this.stepper) {
      this.stepperSubscription = this.stepper.selectionChange.subscribe(
        (event) => {
          if (
            event.selectedIndex !== 1 ||
            this.bookingFormService.passengers.length == 0 ||
            this.bookingFormService.getCurrentBaggagePassengerId()
          )
            return;

          const firstPassenger = this.bookingFormService.passengers.at(0);
          const passportId = firstPassenger.get('passportId')?.value;
          if (passportId) {
            this.bookingFormService.setCurrentBaggagePassengerId(passportId);
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.stepperSubscription?.unsubscribe();
  }

  onChangeCurrentPassengerId(passengerId: string) {
    this.bookingFormService.setCurrentBaggagePassengerId(passengerId);
  }

  get currentPassengerId() {
    return this.bookingFormService.getCurrentBaggagePassengerId();
  }
}
