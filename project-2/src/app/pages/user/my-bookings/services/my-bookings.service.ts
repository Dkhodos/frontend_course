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

  async getFormattedBookings(): Promise<{
    upcomingBookings: BookingItem[];
    previousBookings: BookingItem[];
  }> {
    try {
      // Fetch all bookings
      const bookings = await this.bookingsService.list();

      // Fetch associated flight and destination data
      const flights = await this.flightsService.list();
      const destinations = await this.destinationsService.list();

      // Map bookings to BookingItem format
      const allBookingItems = (
        await Promise.all(
          bookings.map(async (booking) => {
            const details = await this.getBookingDetails(
              booking,
              flights,
              destinations
            );
            return details ? { booking, details } : null;
          })
        )
      ).filter((item) => item !== null) as BookingItem[];

      // Separate upcoming and past bookings
      const upcomingBookings = allBookingItems.filter((item) =>
        this.isUpcoming(item.details!.flight)
      );
      const previousBookings = allBookingItems.filter(
        (item) => !this.isUpcoming(item.details!.flight)
      );

      return { upcomingBookings, previousBookings };
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      return { upcomingBookings: [], previousBookings: [] };
    }
  }

  private async getBookingDetails(
    booking: Booking,
    flights: Flight[],
    destinations: Destination[]
  ): Promise<BookingItem['details'] | null> {
    // Find the corresponding flight
    const flight = flights.find((f) => f.flightNumber === booking.flightNumber);
    if (!flight) return null;

    // Find the origin and destination locations
    const origin = destinations.find((d) => d.code === flight.originCode);
    const destination = destinations.find(
      (d) => d.code === flight.destinationCode
    );

    if (!origin || !destination) return null;

    return { flight, origin, destination };
  }

  private isUpcoming(flight: Flight): boolean {
    return new Date(flight.boardingDate) > new Date();
  }
}
