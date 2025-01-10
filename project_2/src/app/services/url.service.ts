import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private readonly AppRoutes = {
    booking: (flightNumber: string) => ['/booking', flightNumber],
    destination: (code: string) => ['/destination', code],
    flightInfo: (flightNumber: string) => ['/flight', 'info', flightNumber],
    flightBook: (flightNumber: string) => ['/flight', 'book', flightNumber],
    flightEdit: (flightNumber: string) => ['/flight', 'edit', flightNumber],
    flightAdd: () => ['/flight', 'add'],
  };

  constructor(private router: Router) {}

  getBookingPageURL(flightNumber: string): string[] {
    return this.AppRoutes.booking(flightNumber);
  }

  getDestinationPageURL(code: string): string[] {
    return this.AppRoutes.destination(code);
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
}
