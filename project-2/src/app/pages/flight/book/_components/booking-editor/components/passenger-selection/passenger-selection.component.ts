import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BookingFormService } from '../../services/booking-form.service';
import { Option } from '../../../../../../../components/form-select/form-select.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-passenger-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './passenger-selection.component.html',
  styleUrls: ['./passenger-selection.component.scss'],
})
export class PassengerSelectionComponent implements OnInit, OnDestroy {
  passengers = signal<Option[]>([]);
  private subscription: Subscription | null = null;

  constructor(private bookingFormService: BookingFormService) {}

  ngOnInit() {
    this.subscription =
      this.bookingFormService.bookingForm.valueChanges.subscribe(() => {
        this.passengers.set(this.getPassengers());
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onSelect(passengerId: string): void {
    this.bookingFormService.setCurrentBaggagePassengerId(passengerId);
  }

  get selectedPassengerNumber() {
    return this.bookingFormService.getCurrentBaggagePassengerId();
  }

  private getPassengers(): Option[] {
    return this.bookingFormService.passengers.controls.map((item) => {
      const firstName = item.get('firstName')?.value;
      const lastName = item.get('firstName')?.value;
      const id = item.get('passportId')?.value;

      return {
        label: `${firstName} ${lastName}`,
        value: id,
      };
    });
  }
}
