import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { FlightsTableComponent } from '../../_components/flights-table/ flights-table.component';
import { Flight } from '../../../models/flight.model';
import { Destination } from '../../../models/destination.model';
import { FlightsService } from '../../../services/flights.service';
import { DestinationsService } from '../../../services/destinations.service';

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
    this.flights = this.flightsService.list();
    this.destinations = this.destinationsService.list();
  }
}
