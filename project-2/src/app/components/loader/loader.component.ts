import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'ono-flight-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
})
export class LoaderComponent {
  @Input() title?: string = '';
  @Input() description?: string = '';
}
