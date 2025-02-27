import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BookingItem } from './destinations-cards.component.types';
import { UrlService } from '../../../../../services/url.service';
import { NotFoundPlaceholderComponent } from '../../../../../components/not-found-placeholder/not-found-placeholder.component';
import { MatMenuModule } from '@angular/material/menu';
import { Booking } from '../../../../../models/booking.model';
import { ConfirmationDialogService } from '../../../../../components/conformation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-destinations-cards',
  templateUrl: './destinations-cards.component.html',
  styleUrls: ['./destinations-cards.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatCard,
    NotFoundPlaceholderComponent,
    CommonModule,
    MatMenuModule,
  ],
})
export class DestinationsCardsComponent {
  constructor(
    private urlService: UrlService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  @Input() bookings!: BookingItem[];
  @Input() canBeDisabled = true;
  @Output() disableBooking = new EventEmitter<Booking>();
  @Output() enableBooking = new EventEmitter<Booking>();

  // Compute total baggage items across all passengers (if available)
  getTotalBaggage(booking: Booking): number {
    return booking.passengers.reduce(
      (acc, p) => acc + (p.baggage ? p.baggage.length : 0),
      0
    );
  }

  onEdit(booking: Booking) {
    this.router.navigate(
      this.urlService.getEditFlightBookingURL(booking.flightNumber)
    );
  }

  onDisable(booking: Booking) {
    this.confirmationDialogService.show({
      title: 'Disable Booking?',
      variant: 'warning',
      description: `Are you sure you want to disable booking for flight ${booking.flightNumber}?`,
      onConfirm: () => this.disableBooking.emit(booking),
    });
  }

  onEnable(booking: Booking) {
    this.enableBooking.emit(booking);
  }

  isEmpty() {
    return this.bookings.length === 0;
  }

  getSeatNumbers(booking: Booking): string {
    return booking.passengers.map((p) => p.seatNumber).join(', ');
  }

  getBaggages(booking: Booking): string | null {
    const baggages = booking.passengers.reduce((acc: string[], p) => {
      if (p.baggage && p.baggage.length > 0) {
        return acc.concat(p.baggage);
      }
      return acc;
    }, []);
    return baggages.length ? baggages.join(', ') : null;
  }
}
