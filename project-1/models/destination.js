class Destination {
  /**
   * Creates a new Destination instance.
   *
   * @param {string} code - The destination code (e.g., airport code).
   * @param {string} name - The name of the destination (e.g., city or country name).
   * @param {string} airportName - The name of the airport at the destination.
   * @param {string} airportUrl - The URL of the airport's website.
   * @param {string} imageUrl - The URL of an image representing the destination.
   * @param {string} email - The contact email for inquiries related to the destination.
   */
  constructor(code, name, airportName, airportUrl, imageUrl, email) {
    this.code = code;
    this.name = name;
    this.airportName = airportName;
    this.airportUrl = airportUrl;
    this.imageUrl = imageUrl;
    this.email = email;
  }
}

export default Destination;
