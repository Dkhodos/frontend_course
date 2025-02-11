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
import { MyBookingsService } from './services/my-bookings-async.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';

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

  constructor(private myBookingsService: MyBookingsService) {}

  async ngOnInit(): Promise<void> {
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
}
