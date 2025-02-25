import { SectionConfig, SeatSectionType } from './seat-selector.types';
import { PlaneSize } from '../../../../../../../_components/flight-editor/flight-editor.consts';
import reverseObject from '../../../../../../../../../utils/reverseObject';

export const SEAT_TYPE_TO_EXTRA_COST: Record<SeatSectionType, number> = {
  [SeatSectionType.BusinessPlus]: 5000,
  [SeatSectionType.Business]: 500,
  [SeatSectionType.EconomyPlus]: 50,
  [SeatSectionType.Economy]: 50,
};

export const MEDIUM_PLANE_SECTIONS: SectionConfig[] = [
  {
    type: SeatSectionType.Business,
    rows: 5,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Business],
  },
  {
    type: SeatSectionType.EconomyPlus,
    rows: 5,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.EconomyPlus],
  },
  {
    type: SeatSectionType.Economy,
    rows: -1,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Economy],
  },
];

export const LARGE_PLANE_FIXED_SECTIONS: SectionConfig[] = [
  {
    type: SeatSectionType.BusinessPlus,
    rows: 7,
    cols: 3,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.BusinessPlus],
  },
  {
    type: SeatSectionType.Business,
    rows: 6,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Business],
  },
  {
    type: SeatSectionType.EconomyPlus,
    rows: 10,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.EconomyPlus],
  },
  {
    type: SeatSectionType.Economy,
    rows: -1,
    cols: 2,
    extraCost: SEAT_TYPE_TO_EXTRA_COST[SeatSectionType.Business],
  },
];

export const PLANE_SIZE_TO_SECTIONS_CONFIG: Record<PlaneSize, SectionConfig[]> =
  {
    [PlaneSize.Medium]: MEDIUM_PLANE_SECTIONS,
    [PlaneSize.Large]: LARGE_PLANE_FIXED_SECTIONS,
  };

export const SEAT_TYPE_TO_PREFIX: Record<SeatSectionType, string> = {
  [SeatSectionType.Business]: 'B',
  [SeatSectionType.EconomyPlus]: 'EP',
  [SeatSectionType.Economy]: 'E',
  [SeatSectionType.BusinessPlus]: 'BP',
};

export const PREFIX_TO_SEAT_TYPE = reverseObject<
  Record<SeatSectionType, string>,
  Record<string, SeatSectionType>
>(SEAT_TYPE_TO_PREFIX);

export const SEAT_TYPE_TO_SEAT_COUNT_PER_COLUMN: Record<
  SeatSectionType,
  number
> = {
  [SeatSectionType.Business]: 2,
  [SeatSectionType.EconomyPlus]: 3,
  [SeatSectionType.Economy]: 3,
  [SeatSectionType.BusinessPlus]: 1,
};
