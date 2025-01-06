import { Component, OnInit } from '@angular/core';
import { Destination } from '../../models/destination.model';
import { DestinationsService } from '../../services/destinations.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../components/page/page.component';
import { NotFoundPlaceholderComponent } from '../../components/not-found-placeholder/not-found-placeholder.component';

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
  ],
})
export class DestinationPageComponent implements OnInit {
  destination: Destination | null = null;

  constructor(
    private route: ActivatedRoute,
    private destinationsService: DestinationsService
  ) {}

  ngOnInit(): void {
    const destinationCode = this.route.snapshot.paramMap.get('code');
    if (destinationCode) {
      this.destination = this.destinationsService.get(destinationCode) || null;
    }
  }
}
