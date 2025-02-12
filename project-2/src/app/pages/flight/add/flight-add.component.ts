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

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'flight-add.component.html',
  styleUrls: ['flight-add.component.scss'],
  standalone: true,
  imports: [PageComponent, CommonModule, FlightEditorComponent],
})
export class FlightAddPageComponent {
  isLoading = signal(false);

  constructor(private flightsService: FlightsService) {}

  async onSave(flightData: FlightData) {
    this.isLoading.set(true);

    try {
      const existingFlight = await this.flightsService.get(
        flightData.flightNumber
      );
      if (existingFlight) {
        console.error('exist');
        return;
      }

      const startDateStr = dateUtils.formatDate(
        flightData.boardingArrival.start
      );
      const endDateStr = dateUtils.formatDate(flightData.boardingArrival.end);

      const newFlight = new Flight(
        flightData.flightNumber,
        flightData.origin,
        flightData.destination,
        startDateStr,
        flightData.boardingArrival.startTime,
        endDateStr,
        flightData.boardingArrival.endTime,
        flightData.seats
      );

      await this.flightsService.add(newFlight);
      console.log('added!');
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading.set(false); // Reset loading state
    }
  }
}
