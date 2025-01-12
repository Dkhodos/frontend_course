class Flight {
  /**
   * Creates a new Flight instance.
   *
   * @param {string} flightNumber - The unique number identifying the flight.
   * @param {string} originCode - The IATA code of the flight's origin airport.
   * @param {string} destinationCode - The IATA code of the flight's destination airport.
   * @param {string} boardingDate - The boarding date of the flight (in YYYY-MM-DD format).
   * @param {string} boardingTime - The boarding time of the flight (in HH:mm format).
   * @param {string} arrivalDate - The arrival date of the flight (in YYYY-MM-DD format).
   * @param {string} arrivalTime - The arrival time of the flight (in HH:mm format).
   * @param {number} seatCount - The total number of seats available on the flight.
   */
  constructor(
    flightNumber,
    originCode,
    destinationCode,
    boardingDate,
    boardingTime,
    arrivalDate,
    arrivalTime,
    seatCount
  ) {
    this.flightNumber = flightNumber;
    this.originCode = originCode;
    this.destinationCode = destinationCode;
    this.boardingDate = boardingDate;
    this.boardingTime = boardingTime;
    this.arrivalDate = arrivalDate;
    this.arrivalTime = arrivalTime;
    this.seatCount = seatCount;
  }
}

export default Flight;
