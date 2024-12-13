import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionModule,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PageComponent } from '../../components/page/page.component';
import { LastMinuteFlightsComponent } from './components/last-minute-flights/last-minute-flights.component';
import { Flight } from '../_models/flight.model';
import { Destination } from '../_models/destination.model';
import { flights } from '../_data/flights';
import { destinations } from '../_data/destinations';
import { FlightsTableComponent } from '../_components/flights-table/ flights-table.component';
import { FlightTableAction } from '../_components/flights-table/flights-table.component.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionModule,
    MatIcon,
    MatCardModule,
    LastMinuteFlightsComponent,
    FlightsTableComponent,
  ],
})
export class HomeComponent {
  flights: Flight[] = [...flights];
  destinations: Destination[] = [...destinations];
  protected readonly FlightTableAction = FlightTableAction;
}
