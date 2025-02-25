import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Passenger from '../../../../../../../../../../../models/passenger.model';

@Component({
  selector: 'app-passenger-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './passenger-selection.component.html',
  styleUrls: ['./passenger-selection.component.scss'],
})
export class PassengerSelectionComponent implements OnChanges {
  @Input() passengers: Passenger[] = [];
  @Input() selectedPassengerNumber: string | null = null;
  @Output() selectPassenger = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['passengers'] && changes['passengers'].currentValue) {
      this.selectPassenger.emit(
        changes['passengers'].currentValue[0].passportNumber
      );
    }
  }

  onSelect(passengerId: string): void {
    this.selectPassenger.emit(passengerId);
  }
}
