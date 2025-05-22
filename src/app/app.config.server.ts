import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const appServerConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()],
});

export { default as AppServerModule } from './app.server';
