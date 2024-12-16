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
  ],
})
export class MyBookingsComponent implements OnInit {
  upcomingBookings: BookingItem[] = [];
  previousBookings: BookingItem[] = [];

  constructor(private myBookingsService: MyBookingsService) {}

  ngOnInit(): void {
    const { upcomingBookings, previousBookings } =
      this.myBookingsService.getFormattedBookings();
    this.upcomingBookings = upcomingBookings;
    this.previousBookings = previousBookings;
  }
}
