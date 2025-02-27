import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconButton } from '@angular/material/button';
import { FormInputComponent } from '../../../../../../../../../../../components/form-input/form-input.component';

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
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Output() remove = new EventEmitter<void>();
}
