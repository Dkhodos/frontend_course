import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PassengerSummaryComponent } from './components/passenger-summary/passenger-summary.component';
import { PassengerSelectionComponent } from './components/passenger-selection/passenger-selection.component';
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
  @Input() seatsControl!: FormControl<SeatSummaryItem[]>;

  // Local mapping: passenger id -> SeatSummaryItem.
  seatSummaries: Record<string, SeatSummaryItem> = {};
  currentPassengerId: string | null = null;
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
    this.currentPassengerId = passengerId;
  }

  onSeatSectionSelected(seatId: string): void {
    if (!this.currentPassengerId) {
      return;
    }
    const passenger = this.passengers.find(
      (p) => p.passportNumber === this.currentPassengerId
    )!;
    this.seatSummaries[this.currentPassengerId] =
      this.seatService.computeSeatSummaryItemForPassenger(passenger, seatId);
    const summaryArray = [...Object.values(this.seatSummaries)];
    this.seatsControl.setValue(summaryArray);
  }

  getSelectedSeat(): string | null {
    if (!this.currentPassengerId) {
      return null;
    }
    const item = this.seatSummaries[this.currentPassengerId];
    return item ? item.seatId : null;
  }

  get seatSummaryState(): SeatSummaryState {
    return this.seatService.getSeatSummary(this.seatSummaries, this.passengers);
  }
}
