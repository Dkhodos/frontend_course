import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ManageFlightsComponent } from './pages/admin/manage-flights/manage-flights.component';
import { ManageDestinationsComponent } from './pages/admin/manage-destinations/manage-destinations.component';
import { BookAFlightComponent } from './pages/user/book-a-flight/book-a-flight.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { FlightInfoPageComponent } from './pages/flight/info/flight-info.component';
import { DestinationInfoPageComponent } from './pages/destenation/info/destination-info.component';
import { BookingPageComponent } from './pages/booking/booking.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found.component';
import { FlightAddPageComponent } from './pages/flight/add/flight-add.component';
import { FlightEditPageComponent } from './pages/flight/edit/flight-edit.component';
import { DestinationAddPageComponent } from './pages/destenation/add/destination-add.component';
import { DestinationEditPageComponent } from './pages/destenation/edit/destination-edit.component';
import { AddFlightBookingComponent } from './pages/flight/book/add/add-flight-booking.component';
import { ManageCouponsComponent } from './pages/admin/manage-coupons/manage-coupons.component';
import { CouponAddPageComponent } from './pages/coupons/add/coupon-add.component';
import { CouponEditPageComponent } from './pages/coupons/edit/coupon-edit.component';
import { EditFlightBookingComponent } from './pages/flight/book/edit/edit-flight-booking.component';

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
      {
        path: 'manage/coupons',
        component: ManageCouponsComponent,
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
        path: 'book',
        children: [
          {
            path: 'add/:flightNumber',
            component: AddFlightBookingComponent,
          },
          {
            path: 'edit/:flightNumber',
            component: EditFlightBookingComponent,
          },
        ],
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
    path: 'coupon',
    children: [
      {
        path: 'add',
        component: CouponAddPageComponent,
      },
      {
        path: 'edit/:code',
        component: CouponEditPageComponent,
      },
    ],
  },

  {
    path: 'booking/:flightNumber',
    component: BookingPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
