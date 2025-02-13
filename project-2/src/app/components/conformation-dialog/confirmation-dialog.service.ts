import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DialogVariant = 'info' | 'error' | 'success' | 'warning';

export interface ConfirmationDialogOptions {
  title: string;
  variant?: DialogVariant;
  description?: string;
  icon?: string;
  onConfirm: () => void;
}

interface DialogConfig {
  icon: string;
  color: string;
}

const DEFAULT_CONFIG: Record<
  NonNullable<ConfirmationDialogOptions['variant']>,
  DialogConfig
> = {
  info: { icon: 'info', color: '#1e88e5' },
  error: { icon: 'error', color: '#d32f2f' },
  success: { icon: 'check_circle', color: '#388e3c' },
  warning: { icon: 'warning', color: '#fbc02d' },
};

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private dialogSubject = new BehaviorSubject<ConfirmationDialogOptions | null>(
    null
  );
  public dialog$ = this.dialogSubject.asObservable();

  show(options: ConfirmationDialogOptions) {
    const variant: NonNullable<ConfirmationDialogOptions['variant']> =
      options.variant || 'info';
    const config = DEFAULT_CONFIG[variant];
    const dialogOptions: ConfirmationDialogOptions = {
      title: options.title,
      variant,
      description: options.description,
      icon: options.icon || config.icon,
      onConfirm: options.onConfirm,
    };
    this.dialogSubject.next(dialogOptions);
  }

  hide() {
    this.dialogSubject.next(null);
  }
}
