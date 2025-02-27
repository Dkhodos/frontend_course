import { Injectable } from '@angular/core';
import { Flight } from '../../../../../../../../../models/flight.model';
import { PlaneTypeToInfo } from '../../../../../../../_components/flight-editor/flight-editor.consts';
import { SectionConfig } from './seat-selector.types';
import {
  PLANE_SIZE_TO_SECTIONS_CONFIG,
  SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN,
} from './seat-selector.consts';

@Injectable({
  providedIn: 'root',
})
export class SeatSelectorService {
  getSectionConfigs(flight: Flight): SectionConfig[] {
    const planeInfo = PlaneTypeToInfo[flight.planeType];
    const sections = PLANE_SIZE_TO_SECTIONS_CONFIG[planeInfo.size];
    const fixedSeats = this.computeFixedSeats(sections);
    const remaining = this.computeRemainingSeats(flight.seatCount, fixedSeats);
    return sections.map((section) =>
      this.updateSectionRows(section, remaining)
    );
  }

  private computeFixedSeats(sections: SectionConfig[]): number {
    return sections.reduce((acc: number, section: SectionConfig) => {
      if (section.rows === -1) {
        return acc;
      }
      const seatsPerColumn = SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN[section.type];
      return acc + section.rows * section.cols * seatsPerColumn;
    }, 0);
  }

  private computeRemainingSeats(
    totalSeats: number,
    fixedSeats: number
  ): number {
    return Math.max(0, totalSeats - fixedSeats);
  }

  private updateSectionRows(
    section: SectionConfig,
    remainingSeats: number
  ): SectionConfig {
    if (section.rows === -1) {
      const seatsPerColumn = SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN[section.type];
      return {
        ...section,
        rows: Math.ceil(remainingSeats / (section.cols * seatsPerColumn)),
      };
    }
    return section;
  }
}
