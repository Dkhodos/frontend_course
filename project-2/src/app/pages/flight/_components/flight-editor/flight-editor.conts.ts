import { Option } from '../../../../components/form-select/form-select.component';

export const PLANE_OPTIONS_AND_SEATS: Option[] = [
  {
    label: 'Embraer 190 (100 seats)',
    value: '100',
  },
  {
    label: 'Airbus A320 (150 seats)',
    value: '150',
  },
  {
    label: 'Boeing 737-800 (162 seats)',
    value: '162',
  },
  {
    label: 'Airbus A350-1000 (350 seats)',
    value: '350',
  },
  {
    label: 'Boeing 787-8 Dreamliner (234 seats)',
    value: '234',
  },
];

export const PLANE_SEATS_TO_IMAGE = {
  [PLANE_OPTIONS_AND_SEATS[0].value]: '/assets/planes/embraer-190.png',
  [PLANE_OPTIONS_AND_SEATS[1].value]: '/assets/planes/airbus-a320.png',
  [PLANE_OPTIONS_AND_SEATS[2].value]: '/assets/planes/boeing-737.png',
  [PLANE_OPTIONS_AND_SEATS[3].value]: '/assets/planes/airbus-a350.png',
  [PLANE_OPTIONS_AND_SEATS[4].value]: '/assets/planes/boeing-787-8.png',
};
