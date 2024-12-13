import { Component, ViewEncapsulation } from '@angular/core';
import Booking from '../../_models/booking.model';
import { Destination } from '../../_models/destination.model';
import { Flight } from '../../_models/flight.model';
import { PageComponent } from '../../../components/page/page.component';
import { bookings } from '../../_data/bookings';
import { flights } from '../../_data/flights';
import { destinations } from '../../_data/destinations';
import { MatIcon } from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { DestinationsCardsComponent } from './components/destinations-cards/destinations-cards.component';
import { BookingItem } from './components/destinations-cards/destinations-cards.component.types';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    PageComponent,
    MatIcon,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    DestinationsCardsComponent,
  ],
})
export class MyBookingsComponent {
  bookings: Booking[] = [...bookings];
  flights: Flight[] = [...flights];
  destinations: Destination[] = [...destinations];

  get upcomingBookings(): BookingItem[] {
    return this.bookings
      .map((booking) => ({
        booking,
        details: this.getBookingDetails(booking),
      }))
      .filter(
        (item) => item.details !== null && this.isUpcoming(item.details.flight)
      ) as BookingItem[];
  }

  get previousBookings(): BookingItem[] {
    return this.bookings
      .map((booking) => ({
        booking,
        details: this.getBookingDetails(booking),
      }))
      .filter(
        (item) => item.details !== null && !this.isUpcoming(item.details.flight)
      ) as BookingItem[];
  }

  private getBookingDetails(booking: Booking): BookingItem['details'] | null {
    const flight = this.flights.find(
      (f) => f.flightNumber === booking.flightNumber
    );
    if (!flight) return null;

    const origin = this.destinations.find((d) => d.code === flight.originCode);
    if (!origin) return null;

    const destination = this.destinations.find(
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
