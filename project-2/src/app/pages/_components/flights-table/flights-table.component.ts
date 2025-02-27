import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlightTableAction } from './flights-table.component.types';
import { Flight, FlightStatus } from '../../../models/flight.model';
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
import { ConfirmationDialogService } from '../../../components/conformation-dialog/confirmation-dialog.service';
import { PlaneTypeToInfo } from '../../flight/_components/flight-editor/flight-editor.consts';
import { MatDialog } from '@angular/material/dialog';
import {
  FilterFlightDialogComponent,
  FlightFilterData,
} from './components/filter-flight-dialog/filter-flight-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  @Output() filter = new EventEmitter<FlightFilterData>();
  @Output() deleteFlight = new EventEmitter<Flight>();
  @Output() disableFlight = new EventEmitter<Flight>();
  @Output() enableFlight = new EventEmitter<Flight>();

  constructor(
    private urlService: UrlService,
    private sanitizer: DomSanitizer,
    private confirmationDialogService: ConfirmationDialogService,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  protected readonly FlightTableAction = FlightTableAction;

  columns: TableColumn<Flight>[] = [
    {
      key: 'status',
      header: 'Status',
      renderCell: (row: Flight): SafeHtml => {
        const icon =
          row.status === 'enabled'
            ? 'airplanemode_active'
            : 'airplanemode_inactive';

        return this.sanitizer.bypassSecurityTrustHtml(
          `<i class="material-icons">${icon}</i>`
        );
      },

      sortable: false,
    },
    {
      key: 'flightNumber',
      header: 'Flight No.',
      sortable: true,
    },
    {
      key: 'planeType',
      header: 'Plane',
      sortable: true,
      renderCell: (row: Flight) => PlaneTypeToInfo[row.planeType].name,
    },
    {
      key: 'route',
      header: 'Route',
      sortable: false,
      renderCell: (row: Flight) =>
        `${this.getOriginName(row)} → ${this.getDestinationName(row)}`,
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
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      renderCell: (row: Flight) => `${row.price}$`,
    },
    {
      key: 'seats',
      header: 'Seats Left',
      sortable: false,
      renderCell: (row: Flight) => row.flightSeatStatus,
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

    if (
      this.actions.includes(FlightTableAction.Enable) &&
      row.status === FlightStatus.Disabled
    ) {
      options.push({
        value: FlightTableAction.Enable,
        title: 'Enable',
        icon: 'airplanemode_active',
      });
    }

    if (
      this.actions.includes(FlightTableAction.Disable) &&
      row.status === FlightStatus.Enabled
    ) {
      options.push({
        value: FlightTableAction.Disable,
        title: 'Disable',
        icon: 'airplanemode_inactive',
        section: 'Danger',
        color: '#fa5252',
      });
    }

    return options;
  }

  getFlightTableOptionsHeader(flight: Flight) {
    return `Flight ${flight.flightNumber}`;
  }

  onOptionClicked(option: MenuOption, flight: Flight) {
    if (option.value === FlightTableAction.Disable) {
      this.confirmationDialogService.show({
        title: 'Disable Flight?',
        variant: 'warning',
        description: `Are you sure you want to disable flight ${flight.flightNumber}?`,
        onConfirm: () => this.disableFlight.emit(flight),
      });
    } else if (option.value === FlightTableAction.Enable) {
      this.enableFlight.emit(flight);
    }
  }

  onFilter(): void {
    const dialogRef = this.dialog.open(FilterFlightDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((filterData: FlightFilterData) => {
      if (filterData) {
        this.filter.emit(filterData);
      }
    });
  }
}
