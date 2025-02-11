import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageComponent } from '../../../components/page/page.component';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights-async.service';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FlightBookForm,
  PassengerListComponent,
} from './components/passenger-list/passenger-list.component';
import { PassengerForm } from './components/passenger-list/components/passenger-item/passenger-item.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { LoaderComponent } from '../../../components/loader/loader.component';

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
    LoaderComponent,
  ],
})
export class FlightBookComponent implements OnInit {
  flight = signal<Flight | null>(null); // ✅ Using Signals for reactivity
  isLoading = signal<boolean>(true); // ✅ Loading state

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

  async ngOnInit(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');

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
