import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastVariant = 'info' | 'error' | 'success' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  timeout?: number;
  icon?: string;
}

interface ToastConfig {
  icon: string;
  timeout: number;
}

const DEFAULT_CONFIG: Record<NonNullable<Toast['variant']>, ToastConfig> = {
  info: { icon: 'info', timeout: 3000 },
  error: { icon: 'error', timeout: 0 },
  success: { icon: 'check_circle', timeout: 3000 },
  warning: { icon: 'warning', timeout: 3000 },
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private toasts: Toast[] = [];

  add(toast: Toast) {
    if (!toast.id || !toast.title) {
      console.error('Toast must have an id and a title');
      return;
    }
    const variant: NonNullable<Toast['variant']> = toast.variant || 'info';
    const config = DEFAULT_CONFIG[variant];

    const newToast: Toast = {
      id: toast.id,
      title: toast.title,
      description: toast.description,
      variant,
      icon: toast.icon || config.icon,
      timeout: toast.timeout !== undefined ? toast.timeout : config.timeout,
    };

    this.toasts.push(newToast);
    this.toastsSubject.next(this.toasts);

    if (newToast.timeout && newToast.timeout > 0) {
      window.setTimeout(() => {
        this.remove(newToast.id);
      }, newToast.timeout);
    }
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toastsSubject.next(this.toasts);
  }
}
