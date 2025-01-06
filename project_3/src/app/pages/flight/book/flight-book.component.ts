import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageComponent } from '../../../components/page/page.component';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'ono-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    PageComponent,
    CommonModule,
    NotFoundPlaceholderComponent,
  ],
})
export class FlightBookComponent implements OnInit {
  flight: Flight | null = null;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');
    if (flightId) {
      this.flight = this.flightsService.get(flightId) || null;
    }
  }
}
