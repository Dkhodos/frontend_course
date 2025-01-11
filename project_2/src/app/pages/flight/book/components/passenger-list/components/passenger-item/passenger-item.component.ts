import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormInputComponent } from '../../../../../../../components/form-input/form-input.component';
import { MatIconButton } from '@angular/material/button';

export interface PassengerForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  passportId: FormControl<string | null>;
}

@Component({
  selector: 'app-passenger-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    FormInputComponent,
    MatIconButton,
  ],
  templateUrl: './passenger-item.component.html',
  styleUrl: './passenger-item.component.scss',
})
export class PassengerItemComponent {
  @Input() group!: FormGroup<PassengerForm>;
  @Input() index!: number;
  @Output() remove = new EventEmitter<void>();
}
