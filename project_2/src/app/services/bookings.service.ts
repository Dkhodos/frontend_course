import { Injectable } from '@angular/core';
import Booking from '../models/booking.model';
import Passenger from '../models/passenger.model'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private readonly bookings = [
    // Flight W61283 exists with origin TLV and destination KRK
    new Booking('W61283', [
      new Passenger('John Doe', 'A12345678'),
      new Passenger('Jane Doe', 'B87654321'),
    ]),

    // Flight LX8396 exists with origin LCA and destination DXB
    new Booking('LX8396', [
      new Passenger('Alice Smith', 'C12345678'),
      new Passenger('Bob Smith', 'D87654321'),
      new Passenger('Charlie Smith', 'E12345678'),
    ]),

    // Flight BA345 exists with origin LHR and destination DXB
    new Booking('BA345', [new Passenger('Charlie Brown', 'F12345678')]),

    // Flight EK123 exists with origin DXB and destination SYD
    new Booking('EK123', [
      new Passenger('David Johnson', 'G12345678'),
      new Passenger('Emma Johnson', 'H87654321'),
      new Passenger('Sophia Johnson', 'I12345678'),
      new Passenger('Liam Johnson', 'J87654321'),
    ]),

    // Flight LH456 exists with origin FRA and destination CDG
    new Booking('LH456', [
      new Passenger('Frank White', 'K12345678'),
      new Passenger('Grace White', 'L87654321'),
    ]),

    // Flight QF789 exists with origin SYD and destination LAX
    new Booking('QF789', [
      new Passenger('Henry Green', 'M12345678'),
      new Passenger('Isabella Green', 'N87654321'),
      new Passenger('Olivia Green', 'O12345678'),
    ]),

    // Flight NH123 exists with origin HND and destination LAX
    new Booking('NH123', [
      new Passenger('Jack Black', 'P12345678'),
      new Passenger('Olivia Black', 'Q87654321'),
    ]),

    // Flight AA789 exists with origin JFK and destination LHR
    new Booking('AA789', [
      new Passenger('Liam Blue', 'R12345678'),
      new Passenger('Sophia Blue', 'S87654321'),
      new Passenger('Mason Blue', 'T12345678'),
    ]),

    // Flight DL456 exists with origin ATL and destination CDG
    new Booking('DL456', [
      new Passenger('Mason Gray', 'U12345678'),
      new Passenger('Ava Gray', 'V87654321'),
      new Passenger('Noah Gray', 'W12345678'),
      new Passenger('Mia Gray', 'X87654321'),
      new Passenger('Lucas Gray', 'Y12345678'),
    ]),

    // Flight AF123 exists with origin CDG and destination JFK
    new Booking('AF123', [
      new Passenger('Noah Brown', 'Z12345678'),
      new Passenger('Mia Brown', 'A87654321'),
    ]),
  ];

  list(): Booking[] {
    return [...this.bookings];
  }

  get(flightNumber: string): Booking | undefined {
    return this.bookings.find(
      (booking) => booking.flightNumber === flightNumber
    );
  }
}
