import { Component, OnInit, signal } from '@angular/core';
import { Destination } from '../../models/destination.model';
import { DestinationsService } from '../../services/destinations.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { NotFoundPlaceholderComponent } from '../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'ono-destination-page',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    CommonModule,
    PageComponent,
    NotFoundPlaceholderComponent,
    LoaderComponent,
  ],
})
export class DestinationPageComponent implements OnInit {
  destination = signal<Destination | null>(null); // ✅ Using Signals
  isLoading = signal<boolean>(true); // ✅ Loading state

  constructor(
    private route: ActivatedRoute,
    private destinationsService: DestinationsService
  ) {}

  async ngOnInit(): Promise<void> {
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
}
