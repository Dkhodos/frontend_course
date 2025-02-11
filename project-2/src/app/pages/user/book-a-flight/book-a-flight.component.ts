import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageComponent } from '../../../components/page/page.component';
import { FlightTableAction } from '../../_components/flights-table/flights-table.component.types';
import { Destination } from '../../../models/destination.model';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { DestinationsService } from '../../../services/destinations.service';
import { BookFilterModalComponent } from './components/book-filter-modal/book-filter-modal.component';
import { FlightsTableComponent } from '../../_components/flights-table/flights-table.component';

@Component({
  selector: 'book-a-flight-page',
  templateUrl: './book-a-flight.component.html',
  styleUrls: ['./book-a-flight.component.scss'],
  standalone: true,
  imports: [PageComponent, FlightsTableComponent],
})
export class BookAFlightComponent implements OnInit {
  flights = signal<Flight[]>([]); // ✅ Signal for flights
  destinations = signal<Destination[]>([]); // ✅ Signal for destinations
  isLoading = signal<boolean>(true); // ✅ Signal for loading state
  protected readonly FlightTableAction = FlightTableAction;

  constructor(
    private flightsService: FlightsService,
    private destinationsService: DestinationsService,
    private dialog: MatDialog // Inject MatDialog
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

  onFilter(): void {
    this.dialog.open(BookFilterModalComponent);
  }
}
