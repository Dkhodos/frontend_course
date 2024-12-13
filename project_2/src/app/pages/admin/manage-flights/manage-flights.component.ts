import { Component } from '@angular/core';
import { Flight } from '../../_models/flight.model';
import { flights } from '../../_data/flights';
import { Destination } from '../../_models/destination.model';
import { destinations } from '../../_data/destinations';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsTableComponent } from '../../_components/flights-table/ flights-table.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';

@Component({
  selector: 'manage-flights-page',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.scss'],
  standalone: true,
  imports: [PageComponent, FlightsTableComponent],
})
export class ManageFlightsComponent {
  flights: Flight[] = [...flights];
  destinations: Destination[] = [...destinations];
  protected readonly FlightTableAction = FlightTableAction;
}
