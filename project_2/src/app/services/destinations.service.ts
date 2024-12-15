import { Injectable } from '@angular/core';
import { Destination } from '../models/destination.model';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  private destinations: Destination[] = [
    new Destination(
      'TLV',
      'Tel Aviv',
      'Ben Gurion Airport',
      'https://www.iaa.gov.il/en/',
      'assets/destinations/TLV.jpeg', // Fixed path
      'info@ben-gurion.com'
    ),
    new Destination(
      'JFK',
      'New York',
      'John F. Kennedy International Airport',
      'https://www.jfkairport.com/',
      'assets/destinations/JFK.jpeg',
      'contact@jfkairport.com'
    ),
    new Destination(
      'LHR',
      'London',
      'Heathrow Airport',
      'https://www.heathrow.com/',
      'assets/destinations/LHR.jpeg',
      'support@heathrow.com'
    ),
    new Destination(
      'DXB',
      'Dubai',
      'Dubai International Airport',
      'https://www.dubaiairports.ae/',
      'assets/destinations/DXB.jpeg',
      'help@dubai-airports.ae'
    ),
    new Destination(
      'CDG',
      'Paris',
      'Charles de Gaulle Airport',
      'https://www.parisaeroport.fr/',
      'assets/destinations/CDG.jpeg',
      'info@cdg.fr'
    ),
    new Destination(
      'FRA',
      'Frankfurt',
      'Frankfurt Airport',
      'https://www.frankfurt-airport.com/',
      'assets/destinations/FRA.jpeg',
      'contact@frankfurt-airport.com'
    ),
    new Destination(
      'KRK',
      'Krakow',
      'John Paul II International Airport',
      'https://www.krakowairport.pl/',
      'assets/destinations/KRK.jpeg',
      'info@krakowairport.pl'
    ),
    new Destination(
      'HND',
      'Tokyo',
      'Haneda Airport',
      'https://www.tokyo-airport-bldg.co.jp/en/',
      'assets/destinations/HND.jpeg',
      'support@haneda.jp'
    ),
    new Destination(
      'SYD',
      'Sydney',
      'Sydney Airport',
      'https://www.sydneyairport.com.au/',
      'assets/destinations/SYD.jpeg',
      'help@sydneyairport.au'
    ),
    new Destination(
      'LAX',
      'Los Angeles',
      'Los Angeles International Airport',
      'https://www.flylax.com/',
      'assets/destinations/LAX.jpeg',
      'info@flylax.com'
    ),
  ];

  getDestinations(): Destination[] {
    return this.destinations;
  }

  getDestinationByCode(code: string): Destination | undefined {
    return this.destinations.find((dest) => dest.code === code);
  }

  static getOriginName(destinations: Destination[], flight: Flight): string {
    return (
      destinations.find((dest) => dest.code === flight.originCode)?.name ||
      'Unknown'
    );
  }

  static getDestinationName(
    destinations: Destination[],
    flight: Flight
  ): string {
    return (
      destinations.find((dest) => dest.code === flight.destinationCode)?.name ||
      'Unknown'
    );
  }

  static getDestinationPageURL(code: string) {
    return `/destination/${code}`;
  }
}
