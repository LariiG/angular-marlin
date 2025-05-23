import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { httpSimulatorInterceptor } from './app/http-simulator.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig, // Mantém todas as configurações existentes
  providers: [
    ...(appConfig.providers || []), // Preserva os providers existentes
    provideAnimations(),
    provideHttpClient(
      withInterceptors([httpSimulatorInterceptor]) // Adiciona o interceptor
    ),
  ],
}).catch((err) => console.error(err));
