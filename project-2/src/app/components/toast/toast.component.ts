import { Component, OnInit } from '@angular/core';
import { ToastService, Toast, ToastVariant } from './toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule, MatIcon],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ]),
    ]),
  ],
  standalone: true,
})
export class ToastComponent implements OnInit {
  TOAST_COLORS: Record<ToastVariant, string> = {
    info: '#1e88e5',
    error: '#d32f2f',
    success: '#388e3c',
    warning: '#fbc02d',
  };

  TOAST_ICONS: Record<ToastVariant, string> = {
    info: 'warning',
    error: 'error',
    success: 'check_circle',
    warning: 'warning',
  };

  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  removeToast(id: string) {
    this.toastService.remove(id);
  }

  getIconName(variant: ToastVariant): string {
    return this.TOAST_ICONS[variant];
  }

  getIconColor(variant: ToastVariant): string {
    return this.TOAST_COLORS[variant];
  }
}
