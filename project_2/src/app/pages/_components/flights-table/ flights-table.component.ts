import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlightTableAction } from './flights-table.component.types';
import { Flight } from '../../../models/flight.model';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../components/table/table.component';
import {
  TableColumn,
  TableGetIdFn,
} from '../../../components/table/table.component.types';
import { LinkButtonComponent } from '../../../components/link-button/link-button.component';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    RouterModule,
    MatIconModule,
    NgIf,
    LinkButtonComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FlightsTableComponent {
  @Input() flights!: Flight[];
  @Input() destinations!: Destination[];
  @Input() actions: FlightTableAction[] = [];

  protected readonly FlightTableAction = FlightTableAction;

  constructor(private sanitizer: DomSanitizer) {}

  columns: TableColumn<Flight>[] = [
    {
      key: 'flightNumber',
      header: 'Flight No.',
      sortable: true,
    },
    {
      key: 'origin',
      header: 'Origin',
      sortable: true,
      renderCell: (row: Flight) => this.getOriginName(row),
    },
    {
      key: 'destination',
      header: 'Destination',
      sortable: true,
      renderCell: (row: Flight) => this.getDestinationName(row),
    },
    {
      key: 'departureTime',
      header: 'Departure',
      sortable: true,
      renderCell: (row: Flight) => `${row.boardingDate} / ${row.boardingTime}`,
    },
    {
      key: 'landingTime',
      header: 'Landing',
      sortable: true,
      renderCell: (row: Flight) => `${row.arrivalDate} / ${row.arrivalTime}`,
    },
  ];

  getId: TableGetIdFn<Flight> = (row) => row.flightNumber;

  getOriginName(flight: Flight): string {
    return DestinationsService.getOriginName(this.destinations, flight);
  }

  getDestinationName(flight: Flight): string {
    return DestinationsService.getDestinationName(this.destinations, flight);
  }
}
