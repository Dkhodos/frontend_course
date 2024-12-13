import Passenger from './passenger.model';

class Booking {
  private passengerCount: number;
  constructor(
    public flightNumber: string,
    public passengers: Passenger[]
  ) {
    this.passengerCount = passengers.length;
  }
}

export default Booking;
