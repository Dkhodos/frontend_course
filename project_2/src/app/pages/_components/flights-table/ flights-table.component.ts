import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlightTableAction } from './flights-table.component.types';
import { Flight } from '../../../models/flight.model';
import { Destination } from '../../../models/destination.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from '../../../components/table/table.component';
import {
  TableColumn,
  TableGetIdFn,
} from '../../../components/table/table.component.types';
import { LinkButtonComponent } from '../../../components/link-button/link-button.component';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    RouterModule,
    MatIconModule,
    CommonModule,
    LinkButtonComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FlightsTableComponent {
  @Input() flights!: Flight[];
  @Input() destinations!: Destination[];
  @Input() actions: FlightTableAction[] = [];

  constructor(private urlService: UrlService) {}

  protected readonly FlightTableAction = FlightTableAction;

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

  getFlightInfoURL(flightNumber: string): string[] {
    return this.urlService.getFlightEditPageURL(flightNumber);
  }

  getFlightAddURL(): string[] {
    return this.urlService.getFlightAddPageURL();
  }

  getFlightBookURL(flightNumber: string): string[] {
    return this.urlService.getFlightBookPageURL(flightNumber);
  }
}
