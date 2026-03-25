import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8180',
      realm: 'agrismart',
      clientId: 'agrismart-admin',
    });
  }

  /**
   * Initialise Keycloak with login-required flow.
   * Called via APP_INITIALIZER before the app renders.
   */
  init(): Promise<void> {
    return this.keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })
      .then(() => {
        // Schedule token refresh 30 s before expiry
        setInterval(() => {
          this.keycloak.updateToken(30).catch(() => this.keycloak.login());
        }, 30_000);
      });
  }

  /** Returns the raw access token string. */
  getToken(): string {
    return this.keycloak.token ?? '';
  }

  /** Returns the preferred_username claim from the token. */
  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

  isLoggedIn(): boolean {
    return !!this.keycloak.authenticated;
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(redirectUri = window.location.origin): Promise<void> {
    return this.keycloak.logout({ redirectUri });
  }
}
