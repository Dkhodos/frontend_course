import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageComponent } from '../../../components/page/page.component';
import { MatIcon } from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { DestinationsCardsComponent } from './components/destinations-cards/destinations-cards.component';
import { BookingItem } from './components/destinations-cards/destinations-cards.component.types';
import { MyBookingsService } from './services/my-bookings.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../components/toast/toast.service';
import { Booking } from '../../../models/booking.model';
import { Flight } from '../../../models/flight.model';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    PageComponent,
    MatIcon,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    DestinationsCardsComponent,
    LoaderComponent,
    CommonModule,
  ],
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: BookingItem[] = [];
  previousBookings: BookingItem[] = [];
  isLoading = true; // 🔄 Add loading state

  constructor(
    private myBookingsService: MyBookingsService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.fetchBookings();
  }

  async fetchBookings() {
    this.isLoading = true;
    try {
      const { upcomingBookings, previousBookings } =
        await this.myBookingsService.getFormattedBookings();

      this.upcomingBookings = upcomingBookings;
      this.previousBookings = previousBookings;
    } catch (error) {
      console.error('❌ Error loading bookings:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onDisableBooking(booking: Booking) {
    try {
      await this.myBookingsService.disable(booking.flightNumber);
      this.toastService.add({
        id: 'booking-disable-success',
        title: 'Booking disabled!',
        description: `Booking for flight ${booking.flightNumber} disabled.`,
        variant: 'success',
      });
      await this.fetchBookings();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'booking-disable-error',
        title: 'Booking was not disabled!',
        description: String(e),
        variant: 'error',
      });
    }
  }

  async onEnableBooking(booking: Booking) {
    try {
      await this.myBookingsService.enable(booking.flightNumber);
      this.toastService.add({
        id: 'booking-enable-success',
        title: 'Booking enabled!',
        description: `Booking for Flight ${booking.flightNumber} enabled.`,
        variant: 'success',
      });
      await this.fetchBookings();
    } catch (e) {
      console.error(e);
      this.toastService.add({
        id: 'booking-enable-error',
        title: 'Booking was not enabled!',
        description: `We uncounted an unexpected error, please try again`,
        variant: 'error',
      });
    }
  }
}
