import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from './keycloak.service';

export const authGuard: CanActivateFn = () => {
  const kc = inject(KeycloakService);

  if (kc.isLoggedIn()) {
    return true;
  }

  // Not authenticated – redirect to Keycloak login page
  kc.login();
  return false;
};
