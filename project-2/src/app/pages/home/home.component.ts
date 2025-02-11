import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { FlightsService } from '../../services/flights-async.service';
import { DestinationsService } from '../../services/destinations-async.service';
import { Flight } from '../../models/flight.model';
import { Destination } from '../../models/destination.model';
import { MatAccordion, MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LastMinuteFlightsComponent } from './components/last-minute-flights/last-minute-flights.component';
import { FlightsTableComponent } from '../_components/flights-table/flights-table.component';
import { FlightTableAction } from '../_components/flights-table/flights-table.component.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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

  flights = signal<Flight[]>([]); // ✅ Using Signal for better efficiency
  destinations = signal<Destination[]>([]); // ✅ Signal for destinations
  isLoading = signal<boolean>(true); // ✅ Signal for loading state

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const [flights, destinations] = await Promise.all([
        this.flightsService.list(),
        this.destinationsService.list(),
      ]);

      console.log('✅ Data received', flights, destinations);
      this.flights.set(flights); // ✅ Updating signal
      this.destinations.set(destinations); // ✅ Updating signal
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    } finally {
      this.isLoading.set(false); // ✅ Ensures loading stops even on error
    }
  }
}
