import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ToolbarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { }
