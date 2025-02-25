export interface SeatSummaryItem {
  passengerName: string;
  passportNumber: string;
  seatId: string;
  seatType: SeatSectionType;
  extraCost: number;
}

export interface SeatSummaryState {
  items: SeatSummaryItem[];
  totalExtraCost: number;
}

export interface SectionConfig {
  type: SeatSectionType;
  rows: number;
  cols: number;
  extraCost: number;
}

export enum SeatSectionType {
  Business = 'Business',
  EconomyPlus = 'Economy Plus',
  Economy = 'Economy',
  BusinessPlus = 'Business Plus',
}
