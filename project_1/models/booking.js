class Booking {
  constructor(flightNumber, passengers) {
    this.flightNumber = flightNumber;
    this.passengers = passengers;
    this.passengerCount = passengers.length;
  }
}

export default Booking;
