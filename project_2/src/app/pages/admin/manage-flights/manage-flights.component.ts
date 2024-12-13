import { Component, OnInit } from '@angular/core';
import { Flight } from '../../_models/flight.model';
import { Destination } from '../../_models/destination.model';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { FlightsService } from '../../_services/flights.service';
import { DestinationsService } from '../../_services/destinations.service';
import { FlightsTableComponent } from '../../_components/flights-table/ flights-table.component';

@Component({
  selector: 'manage-flights-page',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.scss'],
  standalone: true,
  imports: [PageComponent, FlightsTableComponent],
})
export class ManageFlightsComponent implements OnInit {
  flights!: Flight[];
  destinations!: Destination[];
  protected readonly FlightTableAction = FlightTableAction;

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit(): void {
    this.flights = this.flightsService.getFlights();
    this.destinations = this.destinationsService.getDestinations();
  }
}
