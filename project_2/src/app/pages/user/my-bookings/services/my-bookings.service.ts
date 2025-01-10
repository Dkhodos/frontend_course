import { Injectable } from '@angular/core';
import { BookingsService } from '../../../../services/bookings.service';
import { FlightsService } from '../../../../services/flights.service';
import { DestinationsService } from '../../../../services/destinations.service';
import { BookingItem } from '../components/destinations-cards/destinations-cards.component.types';
import Booking from '../../../../models/booking.model';
import { Flight } from '../../../../models/flight.model';
import { Destination } from '../../../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class MyBookingsService {
  constructor(
    private bookingsService: BookingsService,
    private flightsService: FlightsService,
    private destinationsService: DestinationsService
  ) {}

  getFormattedBookings(): {
    upcomingBookings: BookingItem[];
    previousBookings: BookingItem[];
  } {
    const bookings = this.bookingsService.list();
    const flights = this.flightsService.list();
    const destinations = this.destinationsService.list();

    // Map each booking to a BookingItem with details if available
    const allBookingItems = bookings
      .map((booking) => ({
        booking,
        details: this.getBookingDetails(booking, flights, destinations),
      }))
      .filter((item) => item.details !== null) as BookingItem[];

    // Separate into upcoming and previous
    const upcomingBookings = allBookingItems.filter((item) =>
      this.isUpcoming(item.details!.flight)
    );
    const previousBookings = allBookingItems.filter(
      (item) => !this.isUpcoming(item.details!.flight)
    );

    return { upcomingBookings, previousBookings };
  }

  private getBookingDetails(
    booking: Booking,
    flights: Flight[],
    destinations: Destination[]
  ): BookingItem['details'] | null {
    const flight = flights.find((f) => f.flightNumber === booking.flightNumber);
    if (!flight) return null;

    const origin = destinations.find((d) => d.code === flight.originCode);
    if (!origin) return null;

    const destination = destinations.find(
      (d) => d.code === flight.destinationCode
    );
    if (!destination) return null;

    return { flight, origin, destination };
  }

  private isUpcoming(flight: Flight): boolean {
    const now = new Date();
    return new Date(flight.boardingDate) > now;
  }
}
