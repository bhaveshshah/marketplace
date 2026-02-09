import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header-component/header-component';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [HeaderComponent, RouterOutlet, ToastComponent],
})
export class App {}
