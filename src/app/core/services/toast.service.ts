import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  private idCounter = 0;

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 3000,
  ): void {
    const toast: Toast = {
      id: this.idCounter++,
      message,
      type,
    };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    setTimeout(() => this.remove(toast.id), duration);
  }

  remove(id: number): void {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
