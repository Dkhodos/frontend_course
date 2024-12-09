import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgForOf } from '@angular/common';
import { SelectOption } from './select-option.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AppSelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';

  @Output() valueChange: EventEmitter<string | null> = new EventEmitter<
    string | null
  >();

  onValueChange(value: string | null): void {
    this.valueChange.emit(value);
  }
}
