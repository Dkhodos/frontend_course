import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [MatCardModule],
  standalone: true,
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PageComponent {
  @Input() pageTitle = ''; // Page title input
}
