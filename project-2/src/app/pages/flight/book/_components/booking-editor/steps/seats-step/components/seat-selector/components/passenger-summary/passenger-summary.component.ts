import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatSummaryState } from '../../seat-selector.types';

@Component({
  selector: 'app-passenger-summary',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './passenger-summary.component.html',
  styleUrls: ['./passenger-summary.component.scss'],
})
export class PassengerSummaryComponent {
  @Input() summary!: SeatSummaryState;
}
