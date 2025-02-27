import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SeatSectionType } from '../../seat-selector.types';
import {
  SEAT_TYPE_TO_PREFIX,
  SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN,
} from '../../seat-selector.consts';

interface SeatCell {
  id?: string;
  isGap: boolean;
  occupied?: boolean;
}

@Component({
  selector: 'app-seat-section',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './seat-section.component.html',
  styleUrls: ['./seat-section.component.scss'],
})
export class SeatSectionComponent {
  @Input() rows!: number;
  @Input() cols!: number;
  @Input() seatsPerColumn?: number;
  @Input() sectionType!: SeatSectionType;
  @Input() extraCost!: number;
  @Input() selectedSeat: string | null = null;
  // New Input: list of seat IDs that are occupied
  @Input() occupiedSeats: string[] = [];

  @Output() seatSelected: EventEmitter<string> = new EventEmitter<string>();

  // Returns the number of seats per column for this section.
  get effectiveSeatsPerColumn(): number {
    return this.seatsPerColumn !== undefined
      ? this.seatsPerColumn
      : SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN[this.sectionType];
  }

  // Total grid columns: Each block contributes effectiveSeatsPerColumn cells,
  // and between blocks we insert a single gap column.
  get totalGridCols(): number {
    return this.cols * this.effectiveSeatsPerColumn + (this.cols - 1);
  }

  // Generate the 2D grid, marking occupied seats.
  // seat-section.component.ts
  get grid(): SeatCell[][] {
    const grid: SeatCell[][] = [];
    const seatsPerRow = this.effectiveSeatsPerColumn * this.cols;
    for (let row = 0; row < this.rows; row++) {
      const rowCells: SeatCell[] = [];
      for (let block = 0; block < this.cols; block++) {
        for (
          let seatIdx = 0;
          seatIdx < this.effectiveSeatsPerColumn;
          seatIdx++
        ) {
          const seatNumber =
            row * seatsPerRow +
            block * this.effectiveSeatsPerColumn +
            seatIdx +
            1;
          const cellId = `${this.getPrefix()}${seatNumber}`;
          const isOccupied = this.occupiedSeats.includes(cellId);
          rowCells.push({ id: cellId, isGap: false, occupied: isOccupied });
        }
        if (block < this.cols - 1) {
          rowCells.push({ isGap: true });
        }
      }
      grid.push(rowCells);
    }
    return grid;
  }

  get flatGrid(): SeatCell[] {
    return this.grid.reduce((acc, row) => acc.concat(row), [] as SeatCell[]);
  }

  // Returns a prefix string based on the section type.
  getPrefix(): string {
    return SEAT_TYPE_TO_PREFIX[this.sectionType] ?? '';
  }

  // Determines if a given seat cell (by its id) is selected.
  isSelected(seatId: string): boolean {
    return this.selectedSeat === seatId;
  }

  // Only allow clicking on a seat if it’s not a gap or occupied.
  onSeatClick(cell: SeatCell): void {
    if (!cell.isGap && cell.id && !cell.occupied) {
      this.seatSelected.emit(cell.id);
    }
  }
}
