import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { authTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { csrfInterceptor } from './core/interceptors/csrf.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credentialsInterceptor, csrfInterceptor, authTokenInterceptor])),
  ],
};
