import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PageComponent } from '../../components/page/page.component';
import { LastMinuteFlightsComponent } from './components/last-minute-flights/last-minute-flights.component';
import { FlightsTableComponent } from '../_components/flights-table/ flights-table.component';
import { FlightTableAction } from '../_components/flights-table/flights-table.component.types';
import { Flight } from '../../models/flight.model';
import { Destination } from '../../models/destination.model';
import { FlightsService } from '../../services/flights.service';
import { DestinationsService } from '../../services/destinations.service';

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
  encapsulation: ViewEncapsulation.None,
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
    this.flights = this.flightsService.list();
    this.destinations = this.destinationsService.list();
  }
}
