import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { SearchFlightComponent } from './pages/user/search-flight/search-flight.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user/search-flight', pathMatch: 'full' },

  {
    path: 'help',
    component: HelpComponent,
  },

  {
    path: 'admin',
    children: [],
  },

  {
    path: 'user',
    children: [
      {
        path: 'search-flight',
        component: SearchFlightComponent,
      },
    ],
  },
];
