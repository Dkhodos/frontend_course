import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

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
    children: [],
  },
];
