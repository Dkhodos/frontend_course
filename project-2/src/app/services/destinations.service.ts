import { Injectable } from '@angular/core';
import { Destination } from '../models/destination.model';
import { Option } from '../components/form-select/form-select.component';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {
  private readonly destinations: Destination[] = [
    new Destination(
      'TLV',
      'Tel Aviv',
      'Ben Gurion Airport',
      'https://www.iaa.gov.il/en/',
      'https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/All_Destinations/AFME/Africa_-_Middle_East/Tel%20Aviv%20Guide%202023_HERO/Tel-Aviv-Travel-Guide-What%27s-New-in-Israel%27s-Capit.jpg?tr=w-1008%2Ch-567%2Cfo-auto',
      'info@ben-gurion.com'
    ),
    new Destination(
      'JFK',
      'New York',
      'John F. Kennedy International Airport',
      'https://www.jfkairport.com/',
      'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg',
      'contact@jfkairport.com'
    ),
    new Destination(
      'LHR',
      'London',
      'Heathrow Airport',
      'https://www.heathrow.com/',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg',
      'support@heathrow.com'
    ),
    new Destination(
      'DXB',
      'Dubai',
      'Dubai International Airport',
      'https://www.dubaiairports.ae/',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBO5pN8RAgeOQr58-Jd5RNjOX62MMHbkAjRA&s',
      'help@dubai-airports.ae'
    ),
    new Destination(
      'CDG',
      'Paris',
      'Charles de Gaulle Airport',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg',
      'assets/destinations/CDG.jpeg',
      'info@cdg.fr'
    ),
    new Destination(
      'FRA',
      'Frankfurt',
      'Frankfurt Airport',
      'https://www.frankfurt-airport.com/',
      'https://www.canvas-living.de/media/e42fys4n/steven-wei-kzstuiavcbu-unsplash.jpg?rmode=max&width=825',
      'contact@frankfurt-airport.com'
    ),
    new Destination(
      'KRK',
      'Krakow',
      'John Paul II International Airport',
      'https://www.krakowairport.pl/',
      'https://sumfinity.com/wp-content/uploads/2014/02/Mary-Basilica-Krakow.jpg',
      'info@krakowairport.pl'
    ),
    new Destination(
      'HND',
      'Tokyo',
      'Haneda Airport',
      'https://www.tokyo-airport-bldg.co.jp/en/',
      'https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg',
      'support@haneda.jp'
    ),
    new Destination(
      'SYD',
      'Sydney',
      'Sydney Airport',
      'https://www.sydneyairport.com.au/',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg',
      'help@sydneyairport.au'
    ),
    new Destination(
      'LAX',
      'Los Angeles',
      'Los Angeles International Airport',
      'https://www.flylax.com/',
      'https://lp-cms-production.imgix.net/2024-01/shutterstockRF384845107.jpg?fit=crop&w=3840&auto=format&q=75',
      'info@flylax.com'
    ),
  ];

  list(): Destination[] {
    return [...this.destinations];
  }

  options(): Option[] {
    return this.list().map((des) => ({
      label: des.name,
      value: des.code,
    }));
  }

  get(code: string): Destination | undefined {
    return this.destinations.find((dest) => dest.code === code);
  }
}
