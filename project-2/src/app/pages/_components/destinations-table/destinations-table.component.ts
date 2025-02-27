import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Destination,
  DestinationStatus,
} from '../../../models/destination.model';
import { MatIconModule } from '@angular/material/icon';
import {
  TableColumn,
  TableGetIdFn,
} from '../../../components/table/table.component.types';
import { TableComponent } from '../../../components/table/table.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LinkButtonComponent } from '../../../components/link-button/link-button.component';
import { UrlService } from '../../../services/url.service';
import {
  MenuComponent,
  MenuOption,
} from '../../../components/menu/menu.component';
import { ConfirmationDialogService } from '../../../components/conformation-dialog/confirmation-dialog.service';
import { DestinationTableAction } from './destinations-table.component.types';

@Component({
  selector: 'app-destinations-table',
  templateUrl: './destinations-table.component.html',
  styleUrls: ['./destinations-table.component.scss'],
  standalone: true,
  imports: [
    TableComponent,
    RouterModule,
    MatIconModule,
    LinkButtonComponent,
    MenuComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DestinationsTableComponent {
  @Input() destinations!: Destination[];
  @Output() deleteDestination = new EventEmitter<Destination>();
  @Output() disableDestination = new EventEmitter<Destination>();
  @Output() enableDestination = new EventEmitter<Destination>();

  constructor(
    private sanitizer: DomSanitizer,
    private urlService: UrlService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  columns: TableColumn<Destination>[] = [
    {
      key: 'status',
      header: 'Status',
      renderCell: (row: Destination): SafeHtml => {
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
      key: 'imageUrl',
      header: 'Image',
      renderCell: (row: Destination): SafeHtml =>
        this.sanitizer.bypassSecurityTrustHtml(
          `<img src="${row.imageUrl}" alt="${row.name}" class="rounded-image" />`
        ),

      sortable: false,
    },
    { key: 'code', header: 'Code', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'airportName', header: 'Airport Name', sortable: true },
    {
      key: 'airportUrl',
      header: 'Airport URL',
      renderCell: (row: Destination): SafeHtml =>
        this.sanitizer.bypassSecurityTrustHtml(
          `<a href="${row.airportUrl}" target="_blank">Website</a>`
        ),
    },
    { key: 'email', header: 'Email', sortable: true },
  ];

  getId: TableGetIdFn<Destination> = (row) => row.code;

  getDestinationAddURL() {
    return this.urlService.getDestinationAddPageURL();
  }

  getDestinationTableOptions(row: Destination): MenuOption[] {
    const options: MenuOption[] = [
      {
        value: DestinationTableAction.View,
        title: 'View',
        icon: 'remove_red_eye',
        link: this.urlService.getDestinationInfoPageURL(row.code),
      },
      {
        value: DestinationTableAction.Edit,
        title: 'Edit',
        icon: 'edit',
        link: this.urlService.getDestinationEditPageURL(row.code),
      },
    ];

    if (row.status === DestinationStatus.Enabled) {
      options.push({
        value: DestinationTableAction.Disable,
        title: 'Disable',
        icon: 'airplanemode_inactive',
        section: 'Danger',
        color: '#fa5252',
      });
    } else {
      options.push({
        value: DestinationTableAction.Enable,
        title: 'Enable',
        icon: 'airplanemode_active',
      });
    }

    return options;
  }

  getDestinationTableOptionsHeader(destination: Destination) {
    return `${destination.name} (${destination.code})`;
  }

  onOptionClicked(option: MenuOption, destination: Destination) {
    if (option.value === DestinationTableAction.Disable) {
      this.confirmationDialogService.show({
        title: 'Disable Destination?',
        variant: 'warning',
        description: `Are you sure you want to Disable destination ${destination.name} (${destination.code})?`,
        onConfirm: () => this.disableDestination.emit(destination),
      });
    } else if (option.value === DestinationTableAction.Enable) {
      this.enableDestination.emit(destination);
    }
  }
}
