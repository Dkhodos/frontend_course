import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Booking from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PageComponent } from '../../components/page/page.component';
import { CommonModule } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { NotFoundPlaceholderComponent } from '../../components/not-found-placeholder/not-found-placeholder.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'ono-booking-page',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    PageComponent,
    CommonModule,
    MatList,
    MatListItem,
    NotFoundPlaceholderComponent,
    LoaderComponent,
  ],
})
export class BookingPageComponent implements OnInit {
  booking: Booking | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');

    if (flightNumber) {
      this.bookingsService
        .get(flightNumber)
        .then((booking) => {
          this.booking = booking;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('❌ Error fetching booking:', error);
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }
}
