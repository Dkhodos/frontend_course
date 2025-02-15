import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ManageFlightsComponent } from './pages/admin/manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './pages/admin/manage-destinations/manage-destinations.component';
import { BookAFlightComponent } from './pages/user/book-a-flight/book-a-flight.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { FlightInfoPageComponent } from './pages/flight/info/flight-info.component';
import { DestinationInfoPageComponent } from './pages/destenation/info/destination-info.component';
import { FlightBookComponent } from './pages/flight/book/flight-book.component';
import { BookingPageComponent } from './pages/booking/booking.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found.component';
import { FlightAddPageComponent } from './pages/flight/add/flight-add.component';
import { FlightEditPageComponent } from './pages/flight/edit/flight-edit.component';
import { DestinationAddPageComponent } from './pages/destenation/add/destination-add.component';
import { DestinationEditPageComponent } from './pages/destenation/edit/destination-edit.component';

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
        path: 'add',
        component: FlightAddPageComponent,
      },
      {
        path: 'edit/:flightNumber',
        component: FlightEditPageComponent,
      },
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
    path: 'destination',
    children: [
      {
        path: 'info/:code',
        component: DestinationInfoPageComponent,
      },
      {
        path: 'add',
        component: DestinationAddPageComponent,
      },
      {
        path: 'info/:code',
        component: DestinationInfoPageComponent,
      },
      {
        path: 'edit/:code',
        component: DestinationEditPageComponent,
      },
    ],
  },

  {
    path: 'booking/:flightNumber',
    component: BookingPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
