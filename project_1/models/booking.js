class Booking {
  /**
   * Creates a new Booking instance.
   *
   * @param {string} flightNumber - The flight number associated with the booking.
   * @param {Array<Object>} passengers - An array of passenger objects for the booking.
   */
  constructor(flightNumber, passengers) {
    this.flightNumber = flightNumber;
    this.passengers = passengers;
    this.passengerCount = passengers.length;
  }
}

export default Booking;
