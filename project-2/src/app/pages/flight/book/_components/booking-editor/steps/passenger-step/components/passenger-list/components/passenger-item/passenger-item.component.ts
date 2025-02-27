import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-passenger-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './passenger-item.component.html',
  styleUrls: ['./passenger-item.component.scss'],
})
export class PassengerItemComponent {
  @Input() group!: FormGroup;
  @Input() index!: number;
  @Input() canDelete = true;
  @Output() remove = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.remove.emit();
  }
}
