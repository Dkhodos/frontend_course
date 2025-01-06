import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NAVIGATION_ROUTES, NavItem } from './sidenav.routes';
import { MatActionList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { OnoLogoLinkComponent } from '../ono-logo-link/ono-air-logo-link.component';
import { MatDrawer } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

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
    MatExpansionPanel,
    MatActionList,
    MatNavList,
    OnoLogoLinkComponent,
    MatExpansionPanelHeader,
    CommonModule,
  ],
})
export class SidenavComponent {
  @Input() matDrawer!: MatDrawer;

  topNavItems: NavItem[] = NAVIGATION_ROUTES.filter(
    (item) => item.location !== 'bottom'
  );

  bottomNavItems: NavItem[] = NAVIGATION_ROUTES.filter(
    (item) => item.location === 'bottom'
  );

  async onLinkClick() {
    await this.matDrawer.close();
  }
}
