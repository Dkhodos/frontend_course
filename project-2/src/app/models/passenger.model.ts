export enum Baggage {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export default class Passenger {
  constructor(
    public name: string,
    public passportNumber: string,
    public seatNumber: string,
    public baggage: Baggage[] = []
  ) {}
}
