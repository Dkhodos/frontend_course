import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { DestinationsTableComponent } from '../../_components/destinations-table/destinations-table.component';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations.service';

@Component({
  selector: 'manage-destinations-page',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.scss'],
  standalone: true,
  imports: [PageComponent, DestinationsTableComponent],
})
export class ManageDestinationsComponent implements OnInit {
  destinations!: Destination[];

  constructor(private destinationsService: DestinationsService) {}

  ngOnInit(): void {
    this.destinations = this.destinationsService.getDestinations();
  }
}
