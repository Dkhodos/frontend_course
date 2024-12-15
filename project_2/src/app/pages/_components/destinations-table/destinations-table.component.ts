import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Destination } from '../../../models/destination.model';
import { MatIconModule } from '@angular/material/icon';
import {
  TableColumn,
  TableGetIdFn,
} from '../../../components/table/table.component.types';
import { TableComponent } from '../../../components/table/table.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FlightTableAction } from '../flights-table/flights-table.component.types';
import { LinkButtonComponent } from '../../../components/link-button/link-button.component';

@Component({
  selector: 'app-destinations-table',
  templateUrl: './destinations-table.component.html',
  styleUrls: ['./destinations-table.component.scss'],
  standalone: true,
  imports: [TableComponent, RouterModule, MatIconModule, LinkButtonComponent],
  encapsulation: ViewEncapsulation.None,
})
export class DestinationsTableComponent {
  @Input() destinations!: Destination[];

  constructor(private sanitizer: DomSanitizer) {}

  columns: TableColumn<Destination>[] = [
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
  protected readonly FlightTableAction = FlightTableAction;
}
