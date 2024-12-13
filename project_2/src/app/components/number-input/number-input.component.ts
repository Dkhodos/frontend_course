import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
})
export class NumberInputComponent {
  @Input() placeholder: string = '';
  @Input() value: number | null = null;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';

  @Output() valueChange: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();

  onValueChange(): void {
    this.valueChange.emit(this.value);
  }
}
