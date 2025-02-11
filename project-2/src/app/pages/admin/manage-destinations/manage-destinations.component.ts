import { Component, OnInit, signal } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { DestinationsTableComponent } from '../../_components/destinations-table/destinations-table.component';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations-async.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'manage-destinations-page',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    DestinationsTableComponent,
    LoaderComponent,
    CommonModule,
  ],
})
export class ManageDestinationsComponent implements OnInit {
  destinations = signal<Destination[]>([]); // ✅ Using Signals for efficiency
  isLoading = signal<boolean>(true); // ✅ Loading state

  constructor(private destinationsService: DestinationsService) {}

  async ngOnInit(): Promise<void> {
    try {
      const fetchedDestinations = await this.destinationsService.list();
      this.destinations.set(fetchedDestinations);
    } catch (error) {
      console.error('❌ Error fetching destinations:', error);
    }

    this.isLoading.set(false);
  }
}
