export enum Luggage {
  Small = 'small',
  Medium = 'Medium',
  Large = 'Large',
}

export default class Passenger {
  constructor(
    public name: string,
    public passportNumber: string,
    public seatNumber: string,
    public luggages: Luggage[] = []
  ) {}
}
