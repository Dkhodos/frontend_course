import Destination from '../models/destination.js';

const destinations = [
  new Destination(
    'TLV',
    'Tel Aviv',
    'Ben Gurion Airport',
    'https://www.iaa.gov.il/en/',
    '../../public/destinations/TLV.jpeg',
    'info@ben-gurion.com'
  ),
  new Destination(
    'JFK',
    'New York',
    'John F. Kennedy International Airport',
    'https://www.jfkairport.com/',
    '../../public/destinations/JFK.jpeg',
    'contact@jfkairport.com'
  ),
  new Destination(
    'LHR',
    'London',
    'Heathrow Airport',
    'https://www.heathrow.com/',
    '../../public/destinations/LHR.jpeg',
    'support@heathrow.com'
  ),
  new Destination(
    'DXB',
    'Dubai',
    'Dubai International Airport',
    'https://www.dubaiairports.ae/',
    '../../public/destinations/DXB.jpeg',
    'help@dubai-airports.ae'
  ),
  new Destination(
    'CDG',
    'Paris',
    'Charles de Gaulle Airport',
    'https://www.parisaeroport.fr/',
    '../../public/destinations/CDG.jpeg',
    'info@cdg.fr'
  ),
  new Destination(
    'FRA',
    'Frankfurt',
    'Frankfurt Airport',
    'https://www.frankfurt-airport.com/',
    '../../public/destinations/FRA.jpeg',
    'contact@frankfurt-airport.com'
  ),
  new Destination(
    'KRK',
    'Krakow',
    'John Paul II International Airport',
    'https://www.krakowairport.pl/',
    '../../public/destinations/KRK.jpeg',
    'info@krakowairport.pl'
  ),
  new Destination(
    'HND',
    'Tokyo',
    'Haneda Airport',
    'https://www.tokyo-airport-bldg.co.jp/en/',
    '../../public/destinations/HND.jpeg',
    'support@haneda.jp'
  ),
  new Destination(
    'SYD',
    'Sydney',
    'Sydney Airport',
    'https://www.sydneyairport.com.au/',
    '../../public/destinations/SYD.jpeg',
    'help@sydneyairport.au'
  ),
  new Destination(
    'LAX',
    'Los Angeles',
    'Los Angeles International Airport',
    'https://www.flylax.com/',
    '../../public/destinations/LAX.jpeg',
    'info@flylax.com'
  ),
];

export default destinations;
