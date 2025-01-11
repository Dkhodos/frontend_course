import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageComponent } from '../../../components/page/page.component';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FlightBookForm,
  PassengerListComponent,
} from './components/passenger-list/passenger-list.component';
import { PassengerForm } from './components/passenger-list/components/passenger-item/passenger-item.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
    ReactiveFormsModule,
    PassengerListComponent,
    MatButton,
    MatIcon,
  ],
})
export class FlightBookComponent implements OnInit {
  flight: Flight | null = null;

  form: FormGroup<FlightBookForm>;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group<FlightBookForm>({
      passengers: this.fb.array<FormGroup<PassengerForm>>([]),
    });
  }

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');
    if (flightId) {
      this.flight = this.flightsService.get(flightId) || null;
    }
  }
}
