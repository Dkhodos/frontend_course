import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsService } from '../../../services/flights.service';
import { FlightEditorComponent } from '../_components/flight-editor/flight-editor.component';
import {Flight} from '../../../models/flight.model';
import {ActivatedRoute} from '@angular/router';
import {NotFoundPlaceholderComponent} from '../../../components/not-found-placeholder/not-found-placeholder.component';

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
  ],
})
export class FlightEditPageComponent implements OnInit {
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
