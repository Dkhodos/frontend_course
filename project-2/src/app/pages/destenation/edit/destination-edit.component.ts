import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotFoundPlaceholderComponent } from '../../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ToastService } from '../../../components/toast/toast.service';
import { Destination } from '../../../models/destination.model';
import { DestinationsService } from '../../../services/destinations.service';
import {
  DestinationData,
  DestinationEditorComponent,
} from '../_components/destination-editor/destination-editor.component';

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'destination-edit.component.html',
  styleUrls: ['destination-edit.component.scss'],
  standalone: true,
  imports: [
    PageComponent,
    CommonModule,
    DestinationEditorComponent,
    NotFoundPlaceholderComponent,
    LoaderComponent,
  ],
})
export class DestinationEditPageComponent implements OnInit {
  destination = signal<Destination | null>(null);
  isLoading = signal<boolean>(true);
  isUpdating = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private destinationsService: DestinationsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDestination();
  }

  private async loadDestination(): Promise<void> {
    const destinationCode = this.route.snapshot.paramMap.get('code');

    if (destinationCode) {
      try {
        const fetchedDestination =
          await this.destinationsService.get(destinationCode);

        this.destination.set(fetchedDestination);
      } catch (error) {
        console.error('❌ Error fetching destination:', error);
      }
    }

    this.isLoading.set(false);
  }

  async onSave(destinationData: DestinationData) {
    this.isUpdating.set(true);

    try {
      const updatedDestination = new Destination(
        destinationData.code,
        destinationData.name,
        destinationData.airportName,
        destinationData.airportUrl,
        destinationData.imageUrl,
        destinationData.email,
        this.destination()?.status
      );

      await this.destinationsService.update(updatedDestination);

      this.toastService.add({
        id: 'add-destination-success',
        variant: 'success',
        title: 'Destination updated!',
        description: `destination ${destinationData.name} (${destinationData.code}) updated.`,
      });

      this.isUpdating.set(false);
      await this.router.navigate(['admin', 'manage', 'destinations']);
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'add-destination-error',
        variant: 'error',
        title: 'Destination was not updated!',
        description: `We uncounted an unexpected error, please try again`,
      });
      this.isUpdating.set(false);
    }
  }
}
