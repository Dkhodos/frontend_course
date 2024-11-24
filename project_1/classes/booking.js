class Booking {
    constructor(flightNumber, passengers) {
        this.flightNumber = flightNumber; // Associated flight number
        this.passengers = passengers; // Array of Passenger objects
        this.passengerCound = passengers.length; // Number of passengers
    }
}

export default Booking;