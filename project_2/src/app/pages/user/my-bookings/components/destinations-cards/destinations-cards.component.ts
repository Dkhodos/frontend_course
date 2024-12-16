import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { BookingItem } from './destinations-cards.component.types';
import { UrlService } from '../../../../../services/url.service';
import { NotFoundPlaceholderComponent } from '../../../../../components/not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'app-destinations-cards',
  templateUrl: './destinations-cards.component.html',
  styleUrls: ['./destinations-cards.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatIconButton,
    MatCard,
    NgForOf,
    NotFoundPlaceholderComponent,
    NgIf,
  ],
})
export class DestinationsCardsComponent {
  constructor(private urlService: UrlService) {}

  @Input() bookings!: BookingItem[];

  getBookingPageURL(flightNumber: string) {
    return this.urlService.getBookingPageURL(flightNumber);
  }

  isEmpty() {
    return this.bookings.length === 0;
  }
}
