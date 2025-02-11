import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageComponent } from '../../../components/page/page.component';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights-async.service';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'ono-flight-info-page',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
  imports: [
    MatCardModule,
    MatExpansionModule,
    PageComponent,
    MatDivider,
    CommonModule,
    NotFoundPlaceholderComponent,
    LoaderComponent,
  ],
  standalone: true,
})
export class FlightInfoPageComponent implements OnInit {
  flight = signal<Flight | null>(null); // ✅ Using Signals
  isLoading = signal<boolean>(true); // ✅ Loading state

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  async ngOnInit(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('id');

    if (flightId) {
      try {
        const fetchedFlight = await this.flightsService.get(flightId);
        this.flight.set(fetchedFlight);
      } catch (error) {
        console.error('❌ Error fetching flight:', error);
      }
    }

    this.isLoading.set(false);
  }
}
