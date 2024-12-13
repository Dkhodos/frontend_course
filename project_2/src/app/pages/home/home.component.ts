import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionModule,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import flights from './models/flights';
import Flight from './models/flight';
import { destinations as rawDestinations } from './models/destinations';
import { Destination } from './models/destination.model';
import { LastMinuteFlightsComponent } from './components/last-minute-flights/last-minute-flights.component';
import { FlightsTableComponent } from './components/flights-table/ flights-table.component';
import { PageComponent } from '../../components/page/page.component';

@Component({
  selector: 'app-search-flight',
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
  destinations: Destination[] = [...rawDestinations];
}
