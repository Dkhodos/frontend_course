import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OnoLogoLinkComponent } from '../ono-logo-link/ono-air-logo-link.component';

@Component({
  selector: 'ono-flight-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    OnoLogoLinkComponent,
  ],
  standalone: true,
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<void>();
}
