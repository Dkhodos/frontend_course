import { Injectable } from '@angular/core';
import { Flight } from '../../../../../../../../../models/flight.model';
import { PlaneTypeToInfo } from '../../../../../../../_components/flight-editor/flight-editor.consts';
import {
  SeatSectionType,
  SeatSummaryItem,
  SeatSummaryState,
  SectionConfig,
} from './seat-selector.types';
import {
  PLANE_SIZE_TO_SECTIONS_CONFIG,
  PREFIX_TO_SEAT_TYPE,
  SEAT_TYPE_TO_EXTRA_COST,
  SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN,
} from './seat-selector.consts';
import Passenger from '../../../../../../../../../models/passenger.model';

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

  computeSeatSummaryItemForPassenger(
    passenger: Passenger,
    seatId: string
  ): SeatSummaryItem {
    const prefixMatch = seatId.match(/^[A-Z]+/);

    if (prefixMatch) {
      const prefix = prefixMatch[0];

      const seatType = PREFIX_TO_SEAT_TYPE[prefix];
      const extraCost = SEAT_TYPE_TO_EXTRA_COST[seatType];

      return {
        passengerName: passenger.name,
        passportNumber: passenger.passportNumber,
        seatId,
        seatType,
        extraCost,
      };
    }

    return {
      passengerName: passenger.name,
      passportNumber: passenger.passportNumber,
      seatId,
      seatType: SeatSectionType.Economy,
      extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Economy],
    };
  }

  getSeatSummary(
    seatSummaries: Record<string, SeatSummaryItem>,
    passengers: Passenger[]
  ) {
    const summary: SeatSummaryState = { items: [], totalExtraCost: 0 };

    for (const passenger of passengers) {
      const passengerSummary = seatSummaries[passenger.passportNumber];
      const extraCost = passengerSummary?.extraCost ?? 0;

      summary.items.push({
        seatId: passengerSummary?.seatId ?? 'Auto',
        extraCost: extraCost,
        seatType: passengerSummary?.seatType ?? SeatSectionType.Economy,
        passengerName: passenger.name,
        passportNumber: passenger.passportNumber,
      });

      summary.totalExtraCost += extraCost;
    }

    return summary;
  }
}
