import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DrawerModule,
    ButtonModule,
    ToolbarModule,
    RippleModule
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
