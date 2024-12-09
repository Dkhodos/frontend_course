import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule, MatInputModule], // Add MatNativeDateModule
})
export class DatepickerComponent {
  @Input() value: Date | null = null;
  @Input() placeholder: string = 'MM/DD/YYYY';
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  @Output() valueChange: EventEmitter<Date | null> =
    new EventEmitter<Date | null>();

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.valueChange.emit(event.value);
  }
}
