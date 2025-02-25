import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Flight } from '../../../../../models/flight.model';
import Passenger from '../../../../../models/passenger.model';
import { SeatSummaryItem } from '../seats-step/components/seat-selector/seat-selector.types';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-summary-step',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss'],
})
export class SummaryStepComponent {
  @Input() stepper!: MatStepper;
  @Input() flight!: Flight;
  @Input() passengers: Passenger[] = [];
  @Input() seatSummaryItems!: SeatSummaryItem[];
  @Output() book = new EventEmitter<void>();

  getTotalExtraCost(): number {
    return this.seatSummaryItems.reduce((sum, item) => sum + item.extraCost, 0);
  }

  getFlightPrice(): number {
    return this.flight.price;
  }

  getOverallPrice(): number {
    return Number(this.getFlightPrice()) + Number(this.getTotalExtraCost());
  }

  getSeatSummaryText(passenger: Passenger): string {
    const item = this.seatSummaryItems.find(
      (s) => s.passportNumber === passenger.passportNumber
    );
    return item && item.seatId ? item.seatId : 'auto assigned';
  }

  onBook(): void {
    this.book.emit();
  }
}
