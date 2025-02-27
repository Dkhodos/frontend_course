import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../../components/page/page.component';
import { Flight } from '../../../../models/flight.model';
import { FlightsService } from '../../../../services/flights.service';
import { NotFoundPlaceholderComponent } from '../../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Booking } from '../../../../models/booking.model';
import { BookingsService } from '../../../../services/bookings.service';
import { ToastService } from '../../../../components/toast/toast.service';
import { UrlService } from '../../../../services/url.service';
import { BookingEditorComponent } from '../_components/booking-editor/booking-editor.component';

@Component({
  selector: 'ono-edit-flight-booking',
  templateUrl: './edit-flight-booking.component.html',
  styleUrls: ['./edit-flight-booking.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    NotFoundPlaceholderComponent,
    LoaderComponent,
    MatStepperModule,
    BookingEditorComponent,
  ],
})
export class EditFlightBookingComponent implements OnInit {
  flight = signal<Flight | null>(null);
  booking = signal<Booking | null>(null);
  isLoading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private flightsService: FlightsService,
    private bookingsService: BookingsService,
    private toastService: ToastService,
    private urlService: UrlService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const flightId = this.route.snapshot.paramMap.get('flightNumber');

    if (flightId) {
      try {
        const fetchedFlight = await this.flightsService.get(flightId);
        this.flight.set(fetchedFlight);

        const booking = await this.bookingsService.get(flightId);
        this.booking.set(booking);
      } catch (error) {
        console.error('❌ Error fetching booking:', error);
      }
    }
    this.isLoading.set(false);
  }

  get filteredFlight() {
    if (!this.flight() || !this.booking()) return null;

    const passengerSeats = new Set(
      this.booking()!.passengers.map((p) => p.seatNumber)
    );

    const flight = this.flight()!.copy();

    flight.seatsTaken = flight.seatsTaken.filter((s) => !passengerSeats.has(s));
    return flight;
  }

  async onBook(booking: Booking): Promise<void> {
    try {
      await this.bookingsService.updateBookingByFlightNumber(
        booking.flightNumber,
        booking
      );
      this.toastService.add({
        id: 'booking-success',
        title: 'Booking Successful',
        variant: 'success',
        description: 'Your booking has been successfully added.',
      });
      await this.router.navigate(this.urlService.getMyBookingsURL());
    } catch (error) {
      console.error(error);
      this.toastService.add({
        id: 'booking-error',
        title: 'Booking Failed',
        variant: 'error',
        description: 'An error occurred while booking the flight.',
      });
    }
  }
}
