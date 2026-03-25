import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from './keycloak.service';

/**
 * Functional HTTP interceptor that attaches the Keycloak Bearer token
 * to every outgoing request automatically.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const kc = inject(KeycloakService);
  const token = kc.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }

  return next(req);
};
