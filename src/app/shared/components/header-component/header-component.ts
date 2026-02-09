import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { LoginModalComponent } from '@shared/components/login-modal/login-modal.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink, LoginModalComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  showUserMenu = signal(false);

  toggleUserMenu(): void {
    this.showUserMenu.update((value) => !value);
  }

  logout(): void {
    this.authService.logout();
    this.showUserMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-wrapper')) {
      this.showUserMenu.set(false);
    }
  }
}
