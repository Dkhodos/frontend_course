import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsService } from '../../../services/flights.service';
import {
  FlightData,
  FlightEditorComponent,
} from '../_components/flight-editor/flight-editor.component';
import { Flight } from '../../../models/flight.model';
import { dateUtils } from '../../../utils/date-utils';
import { ToastService } from '../../../components/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'flight-add.component.html',
  styleUrls: ['flight-add.component.scss'],
  standalone: true,
  imports: [PageComponent, CommonModule, FlightEditorComponent],
})
export class FlightAddPageComponent {
  isLoading = signal(false);

  constructor(
    private flightsService: FlightsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  async onSave(flightData: FlightData) {
    this.isLoading.set(true);

    try {
      const existingFlight = await this.flightsService.get(
        flightData.flightNumber
      );
      if (existingFlight) {
        console.error('exist');
        this.isLoading.set(false);
        this.toastService.add({
          id: 'add-flight-exist',
          variant: 'error',
          title: 'Flight was not added!',
          description: `flight ${flightData.flightNumber} already exist in our system.`,
        });
        return;
      }

      const startDateStr = dateUtils.formatDate(
        flightData.boardingArrival.start
      );
      const endDateStr = dateUtils.formatDate(flightData.boardingArrival.end);

      const newFlight = new Flight(
        flightData.flightNumber,
        flightData.planeType,
        flightData.origin,
        flightData.destination,
        startDateStr,
        flightData.boardingArrival.startTime,
        endDateStr,
        flightData.boardingArrival.endTime,
        flightData.price,
        flightData.seatCount
      );

      await this.flightsService.add(newFlight);

      this.toastService.add({
        id: 'add-flight-success',
        variant: 'success',
        title: 'Flight added!',
        description: `flight ${newFlight.flightNumber} added.`,
      });

      this.isLoading.set(false);
      await this.router.navigate(['admin', 'manage', 'flights']);
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'add-flight-error',
        variant: 'error',
        title: 'Flight was not added!',
        description: `We uncounted an unexpected error, please try again`,
      });
      this.isLoading.set(false);
    }
  }
}
