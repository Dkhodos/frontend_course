import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ono-not-found-placeholder',
  templateUrl: './not-found-placeholder.component.html',
  styleUrls: ['./not-found-placeholder.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NotFoundPlaceholderComponent {
  @Input() title = 'Not Found';
  @Input() description = 'The requested data could not be found.';
}
