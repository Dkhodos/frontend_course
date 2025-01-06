import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';
import { dateUtils } from '../utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private readonly flights: Flight[] = [
    new Flight(
      'W61283',
      'TLV',
      'KRK',
      dateUtils.getUpcomingDate(1),
      '20:00',
      dateUtils.getUpcomingDate(2),
      '01:00',
      180
    ),
    new Flight(
      'LX8396',
      'LCA',
      'DXB',
      dateUtils.getUpcomingDate(2),
      '14:30',
      dateUtils.getUpcomingDate(2),
      '18:00',
      200
    ),
    new Flight(
      'BA345',
      'LHR',
      'DXB',
      dateUtils.getUpcomingDate(5),
      '09:00',
      dateUtils.getUpcomingDate(5),
      '20:00',
      250
    ),
    new Flight(
      'EK123',
      'DXB',
      'SYD',
      dateUtils.getUpcomingDate(7),
      '22:00',
      dateUtils.getUpcomingDate(8),
      '07:30',
      300
    ),
    new Flight(
      'LH456',
      'FRA',
      'CDG',
      dateUtils.getUpcomingDate(1),
      '12:15',
      dateUtils.getUpcomingDate(1),
      '14:30',
      150
    ),
    new Flight(
      'QF789',
      'SYD',
      'LAX',
      dateUtils.getUpcomingDate(14),
      '18:00',
      dateUtils.getUpcomingDate(14),
      '13:00',
      350
    ),
    new Flight(
      'NH123',
      'HND',
      'LAX',
      dateUtils.getUpcomingDate(1),
      '11:00',
      dateUtils.getUpcomingDate(1),
      '06:00',
      200
    ),
    new Flight(
      'AA789',
      'JFK',
      'LHR',
      dateUtils.getUpcomingDate(30),
      '19:00',
      dateUtils.getUpcomingDate(31),
      '07:00',
      220
    ),
    new Flight(
      'DL456',
      'ATL',
      'CDG',
      dateUtils.getUpcomingDate(45),
      '22:45',
      dateUtils.getUpcomingDate(46),
      '10:00',
      180
    ),
    new Flight(
      'AF123',
      'CDG',
      'JFK',
      dateUtils.getUpcomingDate(60),
      '15:30',
      dateUtils.getUpcomingDate(60),
      '21:00',
      1
    ),
  ];

  list(): Flight[] {
    return this.flights.sort(
      (a, b) =>
        new Date(a.boardingDate).getTime() - new Date(b.boardingDate).getTime()
    );
  }

  get(flightNumber: string) {
    return this.flights.find((f) => f.flightNumber === flightNumber);
  }
}
