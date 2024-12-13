import { Component, OnInit } from '@angular/core';
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
import { FlightsTableComponent } from '../_components/flights-table/ flights-table.component';
import { FlightTableAction } from '../_components/flights-table/flights-table.component.types';
import { FlightsService } from '../_services/flights.service';
import { DestinationsService } from '../_services/destinations.service';

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
export class HomeComponent implements OnInit {
  protected readonly FlightTableAction = FlightTableAction;
  flights!: Flight[];
  destinations!: Destination[];

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit() {
    this.flights = this.flightsService.getFlights();
    this.destinations = this.destinationsService.getDestinations();
  }
}
