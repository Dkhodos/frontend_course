import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly AppRoutes = {
    booking: (flightNumber: string) => ['/booking', flightNumber],
    myBookings: () => ['/user', 'my-bookings'],
    destinationInfo: (code: string) => ['/destination', 'info', code],
    destinationEdit: (code: string) => ['/destination', 'edit', code],
    destinationAdd: () => ['/destination', 'add'],
    flightInfo: (flightNumber: string) => ['/flight', 'info', flightNumber],
    flightBook: (flightNumber: string) => ['/flight', 'book', flightNumber],
    flightEdit: (flightNumber: string) => ['/flight', 'edit', flightNumber],
    flightAdd: () => ['/flight', 'add'],
  };

  constructor(private router: Router) {}

  getBookingPageURL(flightNumber: string): string[] {
    return this.AppRoutes.booking(flightNumber);
  }

  getDestinationInfoPageURL(code: string): string[] {
    return this.AppRoutes.destinationInfo(code);
  }

  getDestinationEditPageURL(code: string): string[] {
    return this.AppRoutes.destinationEdit(code);
  }

  getDestinationAddPageURL(): string[] {
    return this.AppRoutes.destinationAdd();
  }

  getFlightInfoPageURL(flightNumber: string): string[] {
    return this.AppRoutes.flightInfo(flightNumber);
  }

  getFlightEditPageURL(flightNumber: string): string[] {
    return this.AppRoutes.flightEdit(flightNumber);
  }

  getFlightAddPageURL(): string[] {
    return this.AppRoutes.flightAdd();
  }

  getFlightBookPageURL(flightNumber: string): string[] {
    return this.AppRoutes.flightBook(flightNumber);
  }

  getMyBookingsURL() {
    return this.AppRoutes.myBookings();
  }
}
