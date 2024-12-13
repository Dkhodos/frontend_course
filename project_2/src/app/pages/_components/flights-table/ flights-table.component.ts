import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Flight } from '../../_models/flight.model';
import { Destination } from '../../_models/destination.model';
import { FlightTableAction } from './flights-table.component.types';
import { NgIf } from '@angular/common';

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
    return (
      this.destinations.find((dest) => dest.code === flight.originCode)?.name ||
      'Unknown'
    );
  }

  getDestinationName(flight: Flight): string {
    return (
      this.destinations.find((dest) => dest.code === flight.destinationCode)
        ?.name || 'Unknown'
    );
  }

  protected readonly FlightTableAction = FlightTableAction;
}
