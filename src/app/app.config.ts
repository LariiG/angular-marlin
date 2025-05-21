import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes'; // Importe suas rotas
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // 👈 Configuração do router
    provideAnimations(),
    provideHttpClient(withFetch()), // 👈 Configuração do HttpClient
    // Outros providers...
  ],
};
