import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsService } from '../../../services/flights.service';
import {
  FlightData,
  FlightEditorComponent,
} from '../_components/flight-editor/flight-editor.component';
import { Flight } from '../../../models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { dateUtils } from '../../../utils/date-utils';
import { ToastService } from '../../../components/toast/toast.service';

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
  flight = signal<Flight | null>(null);
  isLoading = signal<boolean>(true);
  isUpdating = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private toastService: ToastService,
    private router: Router
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

    this.isLoading.set(false);
  }

  async onSave(flightData: FlightData) {
    const serverFlight = this.flight();
    if (!serverFlight) return;

    this.isUpdating.set(true);

    try {
      const startDateStr = dateUtils.formatDate(
        flightData.boardingArrival.start
      );
      const endDateStr = dateUtils.formatDate(flightData.boardingArrival.end);

      const updatedFlight = new Flight(
        serverFlight.flightNumber,
        serverFlight.planeType,
        flightData.origin,
        flightData.destination,
        startDateStr,
        flightData.boardingArrival.startTime,
        endDateStr,
        flightData.boardingArrival.endTime,
        flightData.seatCount,
        flightData.price,
        this.flight()?.seatsTaken,
        this.flight()?.status
      );

      await this.flightsService.update(updatedFlight);

      this.toastService.add({
        id: 'add-flight-success',
        variant: 'success',
        title: 'Flight updated!',
        description: `flight ${updatedFlight.flightNumber} updated.`,
      });

      this.isUpdating.set(false);
      await this.router.navigate(['admin', 'manage', 'flights']);
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'add-flight-error',
        variant: 'error',
        title: 'Flight was not updated!',
        description: `We uncounted an unexpected error, please try again`,
      });
      this.isUpdating.set(false);
    }
  }
}
