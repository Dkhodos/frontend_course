import { Component, ViewEncapsulation } from '@angular/core';
import { NAVIGATION_ROUTES, NavItem } from './sidenav.routes';
import { MatActionList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { OnoLogoLinkComponent } from '../ono-logo-link/ono-air-logo-link.component';

@Component({
  selector: 'ono-flight-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatListItem,
    RouterLink,
    MatIcon,
    NgForOf,
    NgIf,
    MatExpansionPanel,
    MatActionList,
    MatNavList,
    OnoLogoLinkComponent,
    MatExpansionPanelHeader,
  ],
})
export class SidenavComponent {
  topNavItems: NavItem[] = NAVIGATION_ROUTES.filter(
    (item) => item.location !== 'bottom'
  );

  bottomNavItems: NavItem[] = NAVIGATION_ROUTES.filter(
    (item) => item.location === 'bottom'
  );
}
