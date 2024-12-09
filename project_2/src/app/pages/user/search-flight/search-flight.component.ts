import { Component } from '@angular/core';
import { destinations as rawDestinations } from './models/destinations';
import { SelectOption } from '../../../components/select/select-option.type';
import { AppSelectComponent } from '../../../components/select/select.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PageComponent } from '../../../components/page/page.component';
import { DatepickerComponent } from '../../../components/datepicker/datepicker.component';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss'],
  standalone: true,
  imports: [
    AppSelectComponent,
    MatFormField,
    FormsModule,
    PageComponent,
    DatepickerComponent,
    MatLabel,
    MatButton,
    MatInput,
  ],
})
export class SearchFlightComponent {
  destinations: SelectOption[] = rawDestinations.map((d) => ({
    label: d.name,
    value: d.code,
  }));

  from: string = '';
  to: string = '';
  departureDate: Date | null = null;
  returnDate: Date | null = null;
  passengers: number = 1;

  onSubmit() {
    console.log({
      from: this.from,
      to: this.to,
      departureDate: this.departureDate,
      returnDate: this.returnDate,
      passengers: this.passengers,
    });
  }
}
