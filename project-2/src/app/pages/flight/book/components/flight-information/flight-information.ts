import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../../../models/flight.model';
import {
  HeaderInfoComponent,
  HeaderInfoItem,
} from '../../../../../components/header-info/header-info.component';

@Component({
  selector: 'app-flight-information',
  standalone: true,
  imports: [CommonModule, HeaderInfoComponent],
  templateUrl: './flight-information.html',
  styleUrls: ['./flight-information.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlightInformationComponent {
  @Input() flight!: Flight;

  get flightItems(): HeaderInfoItem[] {
    return [
      { title: 'Flight Number', value: this.flight.flightNumber },
      { title: 'Origin', value: this.flight.originCode },
      { title: 'Destination', value: this.flight.destinationCode },
      {
        title: 'Boarding',
        value: `${this.flight.boardingDate} ${this.flight.boardingTime}`,
      },
      {
        title: 'Arrival',
        value: `${this.flight.arrivalDate} ${this.flight.arrivalTime}`,
      },
    ];
  }
}
