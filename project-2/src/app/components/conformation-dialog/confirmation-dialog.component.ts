import { Component, OnInit } from '@angular/core';
import {
  ConfirmationDialogService,
  ConfirmationDialogOptions,
  DialogVariant,
} from './confirmation-dialog.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'scale(0.7)' })
        ),
      ]),
    ]),
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class ConfirmationDialogComponent implements OnInit {
  dialog: ConfirmationDialogOptions | null = null;

  // Colors based on the variant. Used in the template for icon color.
  DIALOG_COLORS: Record<DialogVariant, string> = {
    info: '#1e88e5',
    error: '#d32f2f',
    success: '#388e3c',
    warning: '#fbc02d',
  };

  constructor(private dialogService: ConfirmationDialogService) {}

  ngOnInit(): void {
    this.dialogService.dialog$.subscribe((dialog) => {
      this.dialog = dialog;
    });
  }

  confirm() {
    if (this.dialog && this.dialog.onConfirm) {
      this.dialog.onConfirm();
    }
    this.dialogService.hide();
  }

  cancel() {
    this.dialogService.hide();
  }
}
