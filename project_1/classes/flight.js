class Flight {
    constructor(flightNumber, originCode, destinationCode, boardingDate, boardingTime, arrivalDate, arrivalTime, seatCount) {
        this.flightNumber = flightNumber; // Flight number
        this.originCode = originCode; // Origin destination code
        this.destinationCode = destinationCode; // Destination code
        this.boardingDate = boardingDate; // Date of boarding
        this.boardingTime = boardingTime; // Time of boarding
        this.arrivalDate = arrivalDate; // Date of arrival
        this.arrivalTime = arrivalTime; // Time of arrival
        this.seatCount = seatCount; // Number of available seats
    }
}

export default Flight;