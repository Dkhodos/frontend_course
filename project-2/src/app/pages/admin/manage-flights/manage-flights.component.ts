import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { FlightsTableComponent } from '../../_components/flights-table/flights-table.component';
import { Flight } from '../../../models/flight.model';
import { Destination } from '../../../models/destination.model';
import { FlightsService } from '../../../services/flights.service';
import { DestinationsService } from '../../../services/destinations.service';
import { ToastService } from '../../../components/toast/toast.service';

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
    private destinationsService: DestinationsService,
    private toastService: ToastService
  ) {}

  async fetchData() {
    this.isLoading.set(true);

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

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async onDeleteFlight(flight: Flight) {
    try {
      await this.flightsService.delete(flight.flightNumber);
      this.toastService.add({
        id: 'flight-delete-success',
        title: 'Flight deleted!',
        description: `Flight ${flight.flightNumber} deleted.`,
        variant: 'success',
      });
      await this.fetchData();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'flight-delete-success',
        title: 'Flight was not deleted!',
        description: `We uncounted an unexpected error, please try again`,
        variant: 'error',
      });
    }
  }
}
