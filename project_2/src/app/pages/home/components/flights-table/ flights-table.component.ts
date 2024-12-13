import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import Flight from '../../models/flight';
import {Destination} from '../../models/destination.model';


@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class FlightsTableComponent {
  @Input() flights!: Flight[];
  @Input() destinations!: Destination[];

  getOriginName(flight: Flight): string {
    return this.destinations.find((dest) => dest.code === flight.originCode)?.name || 'Unknown';
  }

  getDestinationName(flight: Flight): string {
    return this.destinations.find((dest) => dest.code === flight.destinationCode)?.name || 'Unknown';
  }
}
