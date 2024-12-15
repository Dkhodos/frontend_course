import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { Flight } from '../../../../models/flight.model';
import { Destination } from '../../../../models/destination.model';
import { LinkButtonComponent } from '../../../../components/link-button/link-button.component';
import { FlightsService } from '../../../../services/flights.service';
import { DestinationsService } from '../../../../services/destinations.service';

@Component({
  selector: 'app-last-minute-flights',
  templateUrl: './last-minute-flights.component.html',
  styleUrls: ['./last-minute-flights.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgForOf, LinkButtonComponent],
  encapsulation: ViewEncapsulation.None,
})
export class LastMinuteFlightsComponent implements OnChanges {
  @Input() flights: Flight[] = [];
  @Input() destinations: Destination[] = [];
  @Input() maxFlights = 3;

  filteredFlights: Flight[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] || changes['maxFlights']) {
      this.filteredFlights = this.flights
        .sort(
          (a, b) =>
            new Date(b.boardingDate).getTime() -
            new Date(a.boardingDate).getTime()
        )
        .slice(0, this.maxFlights);
    }
  }

  getDestinationImage(destinationCode: string): string {
    const destination = this.destinations.find(
      (dest) => dest.code === destinationCode
    );
    return destination?.imageUrl || 'assets/default-placeholder.png';
  }

  getDestinationName(destinationCode: string): string {
    const destination = this.destinations.find(
      (dest) => dest.code === destinationCode
    );
    return destination?.name || 'Unknown Destination';
  }

  getAirportName(destinationCode: string): string {
    const destination = this.destinations.find(
      (dest) => dest.code === destinationCode
    );
    return destination?.airportName || 'Unknown Airport';
  }

  getAirportWebsite(destinationCode: string): string {
    const destination = this.destinations.find(
      (dest) => dest.code === destinationCode
    );
    return destination?.airportUrl || '#';
  }

  getFlightURL(flightNumber: string) {
    return FlightsService.getFlightBookPageURL(flightNumber);
  }
}
