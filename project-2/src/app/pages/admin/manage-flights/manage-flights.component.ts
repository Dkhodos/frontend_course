import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { FlightsTableComponent } from '../../_components/flights-table/flights-table.component';
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
  encapsulation: ViewEncapsulation.None,
})
export class ManageFlightsComponent implements OnInit {
  flights = signal<Flight[]>([]); // ✅ Using Signals for reactivity
  destinations = signal<Destination[]>([]); // ✅ Using Signals for efficiency
  isLoading = signal<boolean>(true); // ✅ Signal for loading state
  protected readonly FlightTableAction = FlightTableAction;

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const [fetchedFlights, fetchedDestinations] = await Promise.all([
        this.flightsService.list(),
        this.destinationsService.list(),
      ]);

      this.flights.set(fetchedFlights);
      this.destinations.set(fetchedDestinations);
    } catch (error) {
      console.error('❌ Error fetching flights or destinations:', error);
    }

    this.isLoading.set(false);
  }
}
