import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PassengerSummaryComponent } from './components/passenger-summary/passenger-summary.component';
import { PassengerSelectionComponent } from '../../../../components/passenger-selection/passenger-selection.component';
import { SeatSectionComponent } from './components/seat-section/seat-section.component';
import {
  SeatSummaryItem,
  SeatSummaryState,
  SectionConfig,
} from './seat-selector.types';
import { SeatSelectorService } from './seat-selector.service';
import { MatDividerModule } from '@angular/material/divider';
import { Flight } from '../../../../../../../../../models/flight.model';
import Passenger from '../../../../../../../../../models/passenger.model';
import { PlaneTypeToInfo } from '../../../../../../../_components/flight-editor/flight-editor.consts';
import { AUTO_ASSIGNED_PLACE } from '../../../../booking-editor.consts';

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
export class SeatSelectorComponent implements OnInit {
  @Input() flight!: Flight;
  @Input() passengers: Passenger[] = [];
  @Input() seatsControl!: FormControl<Record<string, SeatSummaryItem>>;
  @Input() seatCurrentPassengerId: string | null = null;
  @Output() changeCurrentPassengerId = new EventEmitter<string>();

  seatSummaries: Record<string, SeatSummaryItem> = {};
  sections: SectionConfig[] = [];
  isMedium = true;

  constructor(private seatService: SeatSelectorService) {}

  ngOnInit(): void {
    // No need to retrieve the form from ControlContainer now.
    this.seatSummaries = {};
    const planeInfo = PlaneTypeToInfo[this.flight.planeType];
    this.isMedium = planeInfo.size === 'medium';
    this.sections = this.seatService.getSectionConfigs(this.flight);
  }

  selectPassenger(passengerId: string): void {
    this.changeCurrentPassengerId.emit(passengerId);
  }

  onSeatSectionSelected(seatId: string): void {
    if (!this.seatCurrentPassengerId) {
      return;
    }
    const passenger = this.passengers.find(
      (p) => p.passportNumber === this.seatCurrentPassengerId
    )!;
    this.seatSummaries[this.seatCurrentPassengerId] =
      this.seatService.computeSeatSummaryItemForPassenger(passenger, seatId);
    this.seatsControl.setValue({ ...this.seatSummaries });
  }

  getSelectedSeat(): string | null {
    if (!this.seatCurrentPassengerId) {
      return null;
    }
    const item = this.passengers.find(
      (p) => p.passportNumber === this.seatCurrentPassengerId
    );
    return item ? item.seatNumber : null;
  }

  get seatSummaryState(): SeatSummaryState {
    return this.seatService.getSeatSummary(this.seatSummaries, this.passengers);
  }

  get occupiedSeats() {
    console.log(this.passengers)

    const sessionSeats = this.passengers
      .filter((p) => p.passportNumber !== this.seatCurrentPassengerId)
      .map((p) => p.seatNumber);

    const currentPassenger = this.passengers.find(
      (p) => p.passportNumber === this.seatCurrentPassengerId
    );

    const flightSeats = this.flight.seatsTaken ?? [];

    return Array.from(new Set([...sessionSeats, ...flightSeats])).filter(
      (s) => s !== AUTO_ASSIGNED_PLACE && s !== currentPassenger?.seatNumber
    );
  }
}
