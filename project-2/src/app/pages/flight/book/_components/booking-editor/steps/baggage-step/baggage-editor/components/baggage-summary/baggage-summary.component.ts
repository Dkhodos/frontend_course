import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SingleBaggageSummary } from '../baggage-counter/baggage-counter.component.types';

@Component({
  selector: 'app-baggage-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './baggage-summary.component.html',
  styleUrls: ['./baggage-summary.component.scss'],
})
export class BaggageSummaryComponent {
  @Input() summary!: SingleBaggageSummary[];

  get totalCost() {
    return this.summary.reduce((total, item) => total + item.price, 0);
  }
}
