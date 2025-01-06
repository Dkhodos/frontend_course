export class Flight {
  constructor(
    public flightNumber: string,
    public originCode: string,
    public destinationCode: string,
    public boardingDate: string,
    public boardingTime: string,
    public arrivalDate: string,
    public arrivalTime: string,
    public seatCount: number
  ) {}
}
