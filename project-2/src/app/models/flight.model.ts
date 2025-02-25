import { Timestamp } from '@angular/fire/firestore';
import { dateUtils } from '../utils/date-utils';

export enum PlaneType {
  Embraer190 = 'embraer-190',
  AirbusA320 = 'airbus-a320',
  Boeing737_800 = 'boeing-737-800',
  AirbusA350_1000 = 'airbus-a350-1000',
  BoeingDreamliner = 'boeing-787-8-dreamliner',
}

export interface FlightFirestoreData {
  flightNumber: string;
  originCode: string;
  destinationCode: string;
  boardingDate: Timestamp;
  arrivalDate: Timestamp;
  planeType: PlaneType;
  seatCount: number;
  price: number;
  seatsTaken: string[]; // now a list of seat IDs
}

export class Flight {
  constructor(
    public flightNumber: string,
    public planeType: PlaneType,
    public originCode: string,
    public destinationCode: string,
    public boardingDate: string, // dd-mm-yyyy
    public boardingTime: string, // hh:mm
    public arrivalDate: string, // dd-mm-yyyy
    public arrivalTime: string, // hh:mm
    public seatCount: number,
    public price: number,
    public seatsTaken: string[] = []
  ) {}

  get flightSeatStatus() {
    const seatsLeft = this.seatCount - this.seatsTaken.length;
    if (seatsLeft === 0) return 'Full!';
    if (seatsLeft < 10) return `Only ${seatsLeft} left!`;
    return `${seatsLeft}/${this.seatCount}`;
  }

  static fromFirestore(data: FlightFirestoreData): Flight {
    return new Flight(
      data.flightNumber,
      data.planeType,
      data.originCode,
      data.destinationCode,
      dateUtils.fromTimestampToDate(data.boardingDate),
      dateUtils.fromTimestampToTime(data.boardingDate),
      dateUtils.fromTimestampToDate(data.arrivalDate),
      dateUtils.fromTimestampToTime(data.arrivalDate),
      data.seatCount,
      data.price,
      data.seatsTaken || []
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
      seatsTaken: this.seatsTaken,
      price: this.price,
      planeType: this.planeType,
    };
  }
}
