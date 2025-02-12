import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export type ButtonVariant =
  | 'mat-button'
  | 'mat-raised-button'
  | 'mat-flat-button'
  | 'mat-stroked-button'
  | 'mat-icon-button'
  | 'mat-fab'
  | 'mat-mini-fab';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule, MatButton, MatIcon],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'mat-button';
  @Input() type: HTMLButtonElement['type'] = 'button';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() icon?: string;
  @Output() onclick = new EventEmitter<Event>();
}
