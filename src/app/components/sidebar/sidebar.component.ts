import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { KeycloakService } from '../../services/auth/keycloak.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, DrawerModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() visible = false;
  @Input() isMobile = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private keycloakService: KeycloakService) {}

  get username(): string {
    return this.keycloakService.getUsername();
  }

  onVisibleChange(val: boolean) {
    this.visibleChange.emit(val);
  }

  onItemClick() {
    if (this.isMobile) {
      this.visibleChange.emit(false);
    }
  }

  logout() {
    this.keycloakService.logout();
  }
}
