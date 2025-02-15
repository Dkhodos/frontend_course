import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { ToastService } from '../../../components/toast/toast.service';
import { Router } from '@angular/router';
import { DestinationsService } from '../../../services/destinations.service';
import {
  DestinationData,
  DestinationEditorComponent,
} from '../_components/destination-editor/destination-editor.component';
import { Destination } from '../../../models/destination.model';

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'destination-add.component.html',
  styleUrls: ['destination-add.component.scss'],
  standalone: true,
  imports: [PageComponent, CommonModule, DestinationEditorComponent],
})
export class DestinationAddPageComponent {
  isLoading = signal(false);

  constructor(
    private destinationsService: DestinationsService,
    private toastService: ToastService,
    private router: Router
  ) {}

  async onSave(destinationData: DestinationData) {
    this.isLoading.set(true);

    try {
      const destination = await this.destinationsService.get(
        destinationData.code
      );
      if (destination) {
        console.error('exist');
        this.isLoading.set(false);
        this.toastService.add({
          id: 'add-destination-exist',
          variant: 'error',
          title: 'Destination was not added!',
          description: `Destination ${destinationData.name} (${destinationData.code}) already exist in our system.`,
        });
        return;
      }

      const newDestination = new Destination(
        destinationData.code,
        destinationData.name,
        destinationData.airportName,
        destinationData.airportUrl,
        destinationData.imageUrl,
        destinationData.email
      );

      await this.destinationsService.add(newDestination);

      this.toastService.add({
        id: 'add-destination-success',
        variant: 'success',
        title: 'Destination added!',
        description: `Destination ${destinationData.name} (${destinationData.code}) added.`,
      });

      this.isLoading.set(false);
      await this.router.navigate(['admin', 'manage', 'flights']);
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'add-flight-error',
        variant: 'error',
        title: 'Flight was not added!',
        description: `We uncounted an unexpected error, please try again`,
      });
      this.isLoading.set(false);
    }
  }
}
