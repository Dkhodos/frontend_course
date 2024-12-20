import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageComponent } from '../../../components/page/page.component';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';

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
  ],
  standalone: true,
})
export class FlightInfoPageComponent implements OnInit {
  flight: Flight | null = null;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');
    if (flightId) {
      this.flight = this.flightsService.get(flightId) || null;
    }
  }
}
