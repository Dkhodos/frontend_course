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

export interface SeatCell {
  id?: string; // Defined for seat cells only
  isGap: boolean; // True if this cell is a gap (corridor)
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
  // Number of row groups (config.rows)
  @Input() rows!: number;
  // Number of seat columns (config.cols) – each representing a block of seats.
  @Input() cols!: number;
  // Number of seats per column (if not provided, default based on section type)
  @Input() seatsPerColumn?: number;
  @Input() sectionType!: SeatSectionType;
  @Input() extraCost!: number;
  // The currently selected seat id (if any) in this section.
  @Input() selectedSeat: string | null = null;

  @Output() seatSelected: EventEmitter<string> = new EventEmitter<string>();

  // Number of seats per column for this section.
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

  // Generate the 2D grid as an array of rows, each row is an array of SeatCell.
  // We assume there are exactly 'rows' grid rows.
  get grid(): SeatCell[][] {
    const grid: SeatCell[][] = [];
    // Total seats per row (without gaps)
    const seatsPerRow = this.effectiveSeatsPerColumn * this.cols;
    // For each row group (0-indexed)
    for (let row = 0; row < this.rows; row++) {
      const rowCells: SeatCell[] = [];
      // For each block (seat column block)
      for (let block = 0; block < this.cols; block++) {
        // For each seat within this block (0-indexed)
        for (
          let seatIdx = 0;
          seatIdx < this.effectiveSeatsPerColumn;
          seatIdx++
        ) {
          // Compute seat number as: (row * seatsPerRow) + (block * effectiveSeatsPerColumn) + seatIdx + 1
          const seatNumber =
            row * seatsPerRow +
            block * this.effectiveSeatsPerColumn +
            seatIdx +
            1;
          const cellId = `${this.getPrefix()}${seatNumber}`;
          rowCells.push({ id: cellId, isGap: false });
        }
        // Insert a gap column between blocks (except after the last block)
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

  // Handles click events on a cell. Only emits if the cell is a seat (not a gap).
  onSeatClick(cell: SeatCell): void {
    if (!cell.isGap && cell.id) {
      this.seatSelected.emit(cell.id);
    }
  }
}
