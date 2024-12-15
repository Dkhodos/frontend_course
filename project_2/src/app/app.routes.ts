import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ManageFlightsComponent } from './pages/admin/manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './pages/admin/manage-destinations/manage-destinations.component';
import { BookAFlightComponent } from './pages/user/book-a-flight/book-a-flight.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { FlightInfoPageComponent } from './pages/flight/info/flight-info.component';
import { DestinationPageComponent } from './pages/destenation/destination.component';
import { FlightBookComponent } from './pages/flight/book/flight-book.component';
import { BookingPageComponent } from './pages/booking/booking.component';
import { General404PageComponent } from './pages/404-page/404.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'help',
    component: HelpComponent,
  },

  {
    path: 'admin',
    children: [
      {
        path: 'manage/flights',
        component: ManageFlightsComponent,
      },
      {
        path: 'manage/destinations',
        component: ManageDestinationsComponent,
      },
    ],
  },

  {
    path: 'user',
    children: [
      {
        path: 'book-a-flight',
        component: BookAFlightComponent,
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent,
      },
    ],
  },

  {
    path: 'flight',
    children: [
      {
        path: 'info/:id',
        component: FlightInfoPageComponent,
      },
      {
        path: 'book/:flightNumber',
        component: FlightBookComponent,
      },
    ],
  },

  {
    path: 'destination/:code',
    component: DestinationPageComponent,
  },

  {
    path: 'booking/:flightNumber',
    component: BookingPageComponent,
  },
  { path: '**', component: General404PageComponent }, // Wildcard route for 404
];
