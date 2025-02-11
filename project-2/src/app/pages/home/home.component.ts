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
import { FlightTableAction } from '../_components/flights-table/flights-table.component.types';
import { Flight } from '../../models/flight.model';
import { Destination } from '../../models/destination.model';
import { FlightsService } from '../../services/flights-async.service';
import { DestinationsService } from '../../services/destinations-async.service';
import { combineLatest, forkJoin, take } from 'rxjs';
import { FlightsTableComponent } from '../_components/flights-table/flights-table.component';

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
  flights: Flight[] = [];
  destinations: Destination[] = [];
  isLoading = true;

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit() {
    console.log('Starting forkJoin...');

    combineLatest([
      this.flightsService.list(),
      this.destinationsService.list(),
    ]).subscribe({
      next: ([flights, destinations]) => {
        console.log('✅ Data received', flights, destinations);
        this.flights = flights;
        this.destinations = destinations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error fetching data:', error);
        this.isLoading = false;
      },
    });
  }
}
