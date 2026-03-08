import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    SidebarComponent
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AgriSmart');
  sidebarVisible = false;
  isMobile = false;

  constructor() {
    this.checkScreen();
    if (!this.isMobile) {
      this.sidebarVisible = true;
    }
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
