import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class LinkButtonComponent {
  @Input() icon?: string; // Optional icon
  @Input() routerLink?: string | string[]; // Optional router link
  @Input() href?: string; // Optional external link
  @Input() target = '_self'; // Link target (_self by default)
  @Input() className = ''; // Optional custom class

  get isExternal(): boolean {
    return Boolean(this.href);
  }
}
