import {
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';

export const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMM/YYYY',
  },
};

export default function appDateAdapter() {
  return provideNativeDateAdapter(DATE_FORMATS);
}
