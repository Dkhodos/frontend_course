import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FlightTableAction } from './flights-table.component.types';
import { NgIf } from '@angular/common';
import { Flight } from '../../../models/flight.model';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations.service';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule, NgIf],
})
export class FlightsTableComponent {
  @Input() flights!: Flight[];
  @Input() destinations!: Destination[];
  @Input() actions: FlightTableAction[] = [];

  getOriginName(flight: Flight): string {
    return DestinationsService.getOriginName(this.destinations, flight);
  }

  getDestinationName(flight: Flight): string {
    return DestinationsService.getDestinationName(this.destinations, flight);
  }

  protected readonly FlightTableAction = FlightTableAction;
}
