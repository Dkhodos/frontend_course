class Destination {
    constructor(code, name, airportName, airportUrl, imageUrl, email) {
        this.code = code; // Three-letter airport code
        this.name = name; // Destination name
        this.airportName = airportName; // Name of the airport
        this.airportUrl = airportUrl; // URL of the airport website
        this.imageUrl = imageUrl; // URL of an image representing the destination 
        this.email = email // Email of the destination
    }
}

export default Destination;