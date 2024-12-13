import { Component } from '@angular/core';
import { Destination } from '../../_models/destination.model';
import { destinations } from '../../_data/destinations';
import { PageComponent } from '../../../components/page/page.component';
import { DestinationsTableComponent } from '../../_components/destinations-table/destinations-table.component';

@Component({
  selector: 'manage-destinations-page',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.scss'],
  standalone: true,
  imports: [PageComponent, DestinationsTableComponent],
})
export class ManageDestinationsComponent {
  destinations: Destination[] = [...destinations];
}
