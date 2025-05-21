// src/app/app.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appServerConfig } from './app.config.server';

export default bootstrapApplication(AppComponent, appServerConfig);
