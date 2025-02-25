import { PlaneType } from '../../../../models/flight.model';

export enum PlaneSize {
  Medium = 'medium',
  Large = 'large',
}

interface PlainInfo {
  seatCount: number;
  topSpeed: number; // Speed in knots
  size: PlaneSize;
  name: string;
  shortDescription: string;
  image: string;
  countryOfOrigin: string;
}

export const PlaneTypeToInfo: Record<PlaneType, PlainInfo> = {
  [PlaneType.Embraer190]: {
    seatCount: 100,
    topSpeed: 470, // knots
    size: PlaneSize.Medium,
    name: 'Embraer 190',
    shortDescription:
      'A regional jet developed by Embraer, offering efficiency and comfort for short to mid-range flights.',
    image: '/assets/planes/embraer-190.png',
    countryOfOrigin: 'Brazil',
  },
  [PlaneType.AirbusA320]: {
    seatCount: 150,
    topSpeed: 460, // knots
    size: PlaneSize.Medium,
    name: 'Airbus A320',
    shortDescription:
      'A popular narrow-body aircraft used for short to medium-haul routes.',
    image: '/assets/planes/airbus-a320.png',
    countryOfOrigin: 'France',
  },
  [PlaneType.Boeing737_800]: {
    seatCount: 162,
    topSpeed: 514, // knots
    size: PlaneSize.Medium,
    name: 'Boeing 737-800',
    shortDescription:
      'A best-selling twin-engine jet known for reliability and efficiency in short-haul operations.',
    image: '/assets/planes/boeing-737.png',
    countryOfOrigin: 'United States',
  },
  [PlaneType.AirbusA350_1000]: {
    seatCount: 350,
    topSpeed: 564, // knots
    size: PlaneSize.Large,
    name: 'Airbus A350 1000',
    shortDescription:
      'A state-of-the-art long-haul wide-body aircraft with high fuel efficiency and advanced aerodynamics.',
    image: '/assets/planes/airbus-a350.png',
    countryOfOrigin: 'France',
  },
  [PlaneType.BoeingDreamliner]: {
    seatCount: 234,
    topSpeed: 561, // knots
    size: PlaneSize.Large,
    name: 'Boeing 787-8 Dreamliner',
    shortDescription:
      'A fuel-efficient long-haul aircraft designed for passenger comfort and efficiency.',
    image: '/assets/planes/boeing-787-8.png',
    countryOfOrigin: 'United States',
  },
};
