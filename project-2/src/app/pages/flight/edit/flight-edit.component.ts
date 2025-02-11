import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsService } from '../../../services/flights-async.service';
import { FlightEditorComponent } from '../_components/flight-editor/flight-editor.component';
import { Flight } from '../../../models/flight.model';
import { ActivatedRoute } from '@angular/router';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'flight-edit.component.html',
  styleUrls: ['flight-edit.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    FlightEditorComponent,
    NotFoundPlaceholderComponent,
    LoaderComponent,
  ],
})
export class FlightEditPageComponent implements OnInit {
  flight = signal<Flight | null>(null); // ✅ Signal for efficiency
  isLoading = signal<boolean>(true); // ✅ Signal for loading state

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    this.loadFlight();
  }

  private async loadFlight(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');

    if (flightId) {
      try {
        const fetchedFlight = await this.flightsService.get(flightId);
        this.flight.set(fetchedFlight);
      } catch (error) {
        console.error('❌ Error fetching flight:', error);
      }
    }

    this.isLoading.set(false); // ✅ Stop loading regardless of success/failure
  }
}
