import { Component, OnInit } from '@angular/core';
import { Flight } from '../../_models/flight.model';
import { Destination } from '../../_models/destination.model';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { FlightsService } from '../../_services/flights.service';
import { DestinationsService } from '../../_services/destinations.service';
import { FlightsTableComponent } from '../../_components/flights-table/ flights-table.component';

@Component({
  selector: 'book-a-flight-page',
  templateUrl: './book-a-flight.component.html',
  styleUrls: ['./book-a-flight.component.scss'],
  standalone: true,
  imports: [PageComponent, FlightsTableComponent],
})
export class BookAFlightComponent implements OnInit {
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
