import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { DestinationsTableComponent } from '../../_components/destinations-table/destinations-table.component';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../components/toast/toast.service';

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
  encapsulation: ViewEncapsulation.None,
})
export class ManageDestinationsComponent implements OnInit {
  destinations = signal<Destination[]>([]); // ✅ Using Signals for efficiency
  isLoading = signal<boolean>(true); // ✅ Loading state

  constructor(
    private destinationsService: DestinationsService,
    private toastService: ToastService,
  ) {}

  async fetchDestinations() {
    this.isLoading.set(true);
    try {
      const fetchedDestinations = await this.destinationsService.list();
      this.destinations.set(fetchedDestinations);
    } catch (error) {
      console.error('❌ Error fetching destinations:', error);
    }

    this.isLoading.set(false);
  }

  async ngOnInit(): Promise<void> {
    await this.fetchDestinations();
  }

  async disableDestination(destination: Destination) {
    try {
      await this.destinationsService.disable(destination.code);
      this.toastService.add({
        id: 'destination-disable-success',
        title: 'Destination disabled!',
        description: `Destination ${destination.code} disabled.`,
        variant: 'success',
      });
      await this.fetchDestinations();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'destination-disable-error',
        title: 'Destination was not disabled!',
        description: String(e),
        variant: 'error',
      });
    }
  }

  async enableDestinations(destination: Destination) {
    try {
      await this.destinationsService.enable(destination.code);
      this.toastService.add({
        id: 'destination-enable-success',
        title: 'Destination enabled!',
        description: `Destination ${destination.code} enabled.`,
        variant: 'success',
      });
      await this.fetchDestinations();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'destination-enable-success',
        title: 'Destination was not enabled!',
        description: `We uncounted an unexpected error, please try again`,
        variant: 'error',
      });
    }
  }

  async deleteDestination(destination: Destination) {
    try {
      await this.destinationsService.delete(destination.code);
      this.toastService.add({
        id: 'destination-delete-success',
        title: 'Destination deleted!',
        description: `Destination ${destination.code} deleted.`,
        variant: 'success',
      });
      await this.fetchDestinations();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'destination-delete-success',
        title: 'Destination was not deleted!',
        description: `We uncounted an unexpected error, please try again`,
        variant: 'error',
      });
    }
  }
}
