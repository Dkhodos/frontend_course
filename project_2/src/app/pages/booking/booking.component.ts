import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Booking from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PageComponent } from '../../components/page/page.component';
import { NgIf, NgFor } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { NotFoundPlaceholderComponent } from '../../components/not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'ono-booking-page',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    PageComponent,
    NgIf,
    NgFor,
    MatList,
    MatListItem,
    NotFoundPlaceholderComponent,
  ],
})
export class BookingPageComponent implements OnInit {
  booking: Booking | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.booking = this.bookingsService.get(flightNumber) || null;
    }
  }
}
