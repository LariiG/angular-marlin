import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ContatoComponent } from './contato/contato.component';
import { LoginComponent } from './login/login.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ContatoComponent,
    LoginComponent, // ← Adicione esta linha
  ],
})
export class AppComponent {}
