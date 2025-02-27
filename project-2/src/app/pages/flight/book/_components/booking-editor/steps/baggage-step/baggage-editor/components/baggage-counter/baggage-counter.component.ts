import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Baggage } from '../../../../../../../../../../models/passenger.model';
import { FormInputComponent } from '../../../../../../../../../../components/form-input/form-input.component';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { BAGGAGE_LIMIT_PER_PASSENGER } from './baggage-counter.component.const';

@Component({
  selector: 'app-baggage-counter',
  templateUrl: './baggage-counter.component.html',
  styleUrls: ['./baggage-counter.component.scss'],
  standalone: true,
  imports: [FormInputComponent, CurrencyPipe, MatIcon],
  encapsulation: ViewEncapsulation.None,
})
export class BaggageCounterComponent {
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) baggageType!: Baggage;
  @Input() dimensions = '';
  @Input() weight = '';
  @Input() usage = '';
  @Input() price = 0;
  @Input() icon = '';

  min = 0;
  max = BAGGAGE_LIMIT_PER_PASSENGER;
}
