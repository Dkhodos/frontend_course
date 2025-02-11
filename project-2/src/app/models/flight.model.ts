import { Timestamp } from '@angular/fire/firestore';
import { dateUtils } from '../utils/date-utils';

export interface FlightFirestoreData {
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  boardingDate: Timestamp;
  arrivalDate: Timestamp;
  seatCount: number;
}

export class Flight {
  constructor(
    public flightNumber: string,
    public originCode: string,
    public destinationCode: string,
    public boardingDate: string, // dd-mm-yyyy
    public boardingTime: string, // hh:mm
    public arrivalDate: string, // dd-mm-yyyy
    public arrivalTime: string, // hh:mm
    public seatCount: number
  ) {}

  static fromFirestore(data: FlightFirestoreData): Flight {
    return new Flight(
      data.flightNumber,
      data.originCode,
      data.destinationCode,
      dateUtils.fromTimestampToDate(data.boardingDate),
      dateUtils.fromTimestampToTime(data.boardingDate),
      dateUtils.fromTimestampToDate(data.arrivalDate),
      dateUtils.fromTimestampToTime(data.arrivalDate),
      data.seatCount
    );
  }

  toFirestore(): FlightFirestoreData {
    return {
      flightNumber: this.flightNumber,
      originCode: this.originCode,
      destinationCode: this.destinationCode,
      boardingDate: dateUtils.toTimestamp(this.boardingDate, this.boardingTime),
      arrivalDate: dateUtils.toTimestamp(this.arrivalDate, this.arrivalTime),
      seatCount: this.seatCount,
    };
  }
}
