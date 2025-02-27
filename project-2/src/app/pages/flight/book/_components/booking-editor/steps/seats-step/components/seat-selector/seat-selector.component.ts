import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PassengerSummaryComponent } from './components/passenger-summary/passenger-summary.component';
import { PassengerSelectionComponent } from '../../../../components/passenger-selection/passenger-selection.component';
import { SeatSectionComponent } from './components/seat-section/seat-section.component';
import { SeatSummaryState, SectionConfig } from './seat-selector.types';
import { SeatSelectorService } from './seat-selector.service';
import { MatDividerModule } from '@angular/material/divider';
import { Flight } from '../../../../../../../../../models/flight.model';
import { AUTO_ASSIGNED_PLACE } from '../../../../booking-editor.consts';
import { BookingFormService } from '../../../../services/booking-form.service';

@Component({
  selector: 'app-seat-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PassengerSummaryComponent,
    PassengerSelectionComponent,
    SeatSectionComponent,
    MatDividerModule,
  ],
  templateUrl: './seat-selector.component.html',
  styleUrls: ['./seat-selector.component.scss'],
})
export class SeatSelectorComponent {
  @Input() flight!: Flight;

  constructor(
    private bookingFormService: BookingFormService,
    private seatSelectorService: SeatSelectorService
  ) {}

  onSeatSectionSelected(seatId: string): void {
    const seatCurrentPassengerId =
      this.bookingFormService.getCurrentSeatPassengerId();
    if (!seatCurrentPassengerId) {
      return;
    }

    const passenger = this.bookingFormService.getCurrentSeatPassenger();
    if (!passenger) return;

    passenger.get('seat')?.setValue(seatId);
  }

  getSelectedSeat(): string | null {
    const passenger = this.bookingFormService.getCurrentSeatPassenger();
    if (!passenger) return null;

    return passenger.get('seat')?.value;
  }

  get sections(): SectionConfig[] {
    return this.seatSelectorService.getSectionConfigs(this.flight);
  }

  get seatSummaryState(): SeatSummaryState {
    return this.bookingFormService.getSeatSummaryState();
  }

  get occupiedSeats(): string[] {
    const seatCurrentPassengerId =
      this.bookingFormService.getCurrentSeatPassengerId();

    const sessionSeats = this.bookingFormService.passengers.controls
      .filter((p) => p.get('passportId') !== seatCurrentPassengerId)
      .map((p) => p.get('seat')?.value);

    const currentPassenger = this.bookingFormService.getCurrentSeatPassenger();
    const flightSeats = this.flight.seatsTaken ?? [];

    return Array.from(new Set([...sessionSeats, ...flightSeats])).filter(
      (s) =>
        s !== AUTO_ASSIGNED_PLACE && s !== currentPassenger?.get('seat')?.value
    );
  }
}
