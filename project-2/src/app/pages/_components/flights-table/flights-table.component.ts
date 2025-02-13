import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
import { MatButton } from '@angular/material/button';
import { LoaderComponent } from '../../../components/loader/loader.component';
import {
  MenuComponent,
  MenuOption,
} from '../../../components/menu/menu.component';

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
    MatButton,
    LoaderComponent,
    MenuComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FlightsTableComponent {
  @Input() flights!: Flight[];
  @Input() destinations!: Destination[];
  @Input() actions: FlightTableAction[] = [];
  @Input() isLoading = false;
  @Output() filter = new EventEmitter<void>();

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

  getFlightEditURL(flightNumber: string): string[] {
    return this.urlService.getFlightEditPageURL(flightNumber);
  }

  getFlightInfoURL(flightNumber: string): string[] {
    return this.urlService.getFlightInfoPageURL(flightNumber);
  }

  getFlightAddURL(): string[] {
    return this.urlService.getFlightAddPageURL();
  }

  getFlightBookURL(flightNumber: string): string[] {
    return this.urlService.getFlightBookPageURL(flightNumber);
  }

  getFlightTableOptions(row: Flight): MenuOption[] {
    const options: MenuOption[] = [];
    if (this.actions.includes(FlightTableAction.BookNow)) {
      options.push({
        value: FlightTableAction.BookNow,
        title: 'Book Now',
        icon: 'flight_takeoff',
        link: this.getFlightBookURL(row.flightNumber),
      });
    }

    if (this.actions.includes(FlightTableAction.View)) {
      options.push({
        value: FlightTableAction.View,
        title: 'View',
        icon: 'remove_red_eye',
        link: this.getFlightInfoURL(row.flightNumber),
      });
    }

    if (this.actions.includes(FlightTableAction.Edit)) {
      options.push({
        value: FlightTableAction.Edit,
        title: 'Edit',
        icon: 'edit',
        link: this.getFlightEditURL(row.flightNumber),
      });
    }

    if (this.actions.includes(FlightTableAction.Delete)) {
      options.push({
        value: FlightTableAction.Delete,
        title: 'Delete',
        icon: 'delete',
        section: 'Danger',
        color: '#fa5252',
      });
    }

    return options;
  }

  getFlightTableOptionsHeader(flight: Flight) {
    return `Flight ${flight.flightNumber}`;
  }
}
