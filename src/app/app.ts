import {Component, HostListener, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, RouterLink],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AgriSmart');
  isMobile = false;

  constructor() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }
}

