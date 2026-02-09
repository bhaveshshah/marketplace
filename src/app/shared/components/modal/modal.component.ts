import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';

export interface ModalConfig {
  title: string;
  showHeader?: boolean;
  showFooter?: boolean;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  config = input<ModalConfig>({ title: 'Modal' });

  closeModal = output<void>();
  primaryAction = output<void>();
  secondaryAction = output<void>();

  primaryButtonText = input<string>('Submit');
  secondaryButtonText = input<string>('Cancel');
  primaryButtonDisabled = input<boolean>(false);
  showPrimaryButton = input<boolean>(true);
  showSecondaryButton = input<boolean>(true);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  onOverlayClick(): void {
    const closeOnOverlay = this.config().closeOnOverlayClick ?? true;
    if (closeOnOverlay) {
      this.closeModal.emit();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onPrimaryClick(): void {
    this.primaryAction.emit();
  }

  onSecondaryClick(): void {
    this.secondaryAction.emit();
  }
}
