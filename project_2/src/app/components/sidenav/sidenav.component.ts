import { Component, ViewEncapsulation } from '@angular/core';
import { NAVIGATION_ROUTES, NavItem } from './sidenav.routes';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { OnoLogoLinkComponent } from '../ono-logo-link/ono-air-logo-link.component';

@Component({
  selector: 'ono-flight-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    RouterLink,
    NgIf,
    NgForOf,
    OnoLogoLinkComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None, // Disable encapsulation
})
export class SidenavComponent {
  navRoutes: NavItem[] = NAVIGATION_ROUTES;
}
