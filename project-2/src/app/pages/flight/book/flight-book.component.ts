import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { Flight } from '../../../models/flight.model';
import { FlightsService } from '../../../services/flights.service';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormArray,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PassengerStepComponent } from './steps/passenger-step/passenger-step.component';
import { BaggageStepComponent } from './steps/baggage-step/baggage-step.component';
import { SeatsStepComponent } from './steps/seats-step/seats-step.component';
import { SummaryStepComponent } from './steps/summary-step/summary-step.component';
import { FlightBookForm } from './steps/passenger-step/components/passenger-list/passenger-list.component';
import { PassengerForm } from './steps/passenger-step/components/passenger-list/components/passenger-item/passenger-item.component';
import { FlightInformationComponent } from './components/flight-information/flight-information';

@Component({
  selector: 'ono-flight-book',
  templateUrl: './flight-book.component.html',
  styleUrls: ['./flight-book.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    NotFoundPlaceholderComponent,
    ReactiveFormsModule,
    LoaderComponent,
    MatStepperModule,
    PassengerStepComponent,
    BaggageStepComponent,
    SeatsStepComponent,
    SummaryStepComponent,
    FlightInformationComponent,
  ],
})
export class FlightBookComponent implements OnInit {
  flight = signal<Flight | null>(null);
  isLoading = signal<boolean>(true);

  form: FormGroup<FlightBookForm>;

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group<FlightBookForm>({
      passengers: this.fb.array<FormGroup<PassengerForm>>(
        [],
        this.minPassengersValidator
      ),
    });
  }

  minPassengersValidator(control: AbstractControl): ValidationErrors | null {
    const arr = control as FormArray;
    return arr.length > 0
      ? null
      : { minPassengers: 'At least one passenger is required' };
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
