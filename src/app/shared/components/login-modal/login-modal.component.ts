import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent, ModalConfig } from '@shared/components/modal/modal.component';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  isOpen = signal<boolean>(false);
  selectedUsername = signal<string>('');

  mockUsers = computed(() => this.authService.getMockUsers());
  isLoginDisabled = computed(() => !this.selectedUsername());

  modalConfig: ModalConfig = {
    title: 'Login to your Account',
    size: 'sm',
    closeOnOverlayClick: true,
  };

  openModal(): void {
    this.isOpen.set(true);
    this.selectedUsername.set('');
  }

  closeModal(): void {
    this.isOpen.set(false);
    this.selectedUsername.set('');
  }

  login(): void {
    const username = this.selectedUsername();

    if (!username) return;

    const success = this.authService.login(username);

    if (success) {
      this.toastService.show('Successfully logged in!', 'success');
      this.closeModal();
    } else {
      this.toastService.show('Login failed. User not found.', 'error');
    }
  }

  onUserSelect(username: string): void {
    this.selectedUsername.set(username);
  }
}
