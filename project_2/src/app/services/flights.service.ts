import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private flights: Flight[] = [
    new Flight(
      'W61283',
      'TLV',
      'KRK',
      '2024-11-10',
      '20:00',
      '2024-11-11',
      '01:00',
      180
    ),
    new Flight(
      'LX8396',
      'LCA',
      'DXB',
      '2025-08-10',
      '14:30',
      '2025-08-10',
      '18:00',
      200
    ),
    new Flight(
      'BA345',
      'LHR',
      'DXB',
      '2024-12-01',
      '09:00',
      '2024-12-01',
      '20:00',
      250
    ),
    new Flight(
      'EK123',
      'DXB',
      'SYD',
      '2025-10-05',
      '22:00',
      '2025-10-06',
      '07:30',
      300
    ),
    new Flight(
      'LH456',
      'FRA',
      'CDG',
      '2024-10-15',
      '12:15',
      '2024-10-15',
      '14:30',
      150
    ),
    new Flight(
      'QF789',
      'SYD',
      'LAX',
      '2025-12-10',
      '18:00',
      '2025-12-10',
      '13:00',
      350
    ),
    new Flight(
      'NH123',
      'HND',
      'LAX',
      '2026-01-05',
      '11:00',
      '2026-01-05',
      '06:00',
      200
    ),
    new Flight(
      'AA789',
      'JFK',
      'LHR',
      '2026-02-14',
      '19:00',
      '2026-02-15',
      '07:00',
      220
    ),
    new Flight(
      'DL456',
      'ATL',
      'CDG',
      '2026-03-01',
      '22:45',
      '2026-03-02',
      '10:00',
      180
    ),
    new Flight(
      'AF123',
      'CDG',
      'JFK',
      '2026-04-01',
      '15:30',
      '2026-04-01',
      '21:00',
      1
    ),
  ];

  getFlights(): Flight[] {
    return this.flights;
  }

  getFlightById(flightNumber: string) {
    return this.flights.find((f) => f.flightNumber === flightNumber);
  }

  static getFlightInfoPageURL(flightNumber: string) {
    return `/flight/info/${flightNumber}`;
  }

  static getFlightBookPageURL(flightNumber: string) {
    return `/flight/book/${flightNumber}`;
  }
}
