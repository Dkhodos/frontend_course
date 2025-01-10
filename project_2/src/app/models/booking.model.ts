import Passenger from './passenger.model';

class Booking {
  constructor(
    public flightNumber: string,
    public passengers: Passenger[]
  ) {}

  get passengerCount() {
    return this.passengers.length;
  }
}

export default Booking;
