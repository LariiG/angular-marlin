import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  carregando = false;
  mostrarRedesSociais = true; // Controle para desenvolvimento

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      lembrar: [false],
    });

    // Registrar ícones personalizados
    this.registrarIcones();
  }

  private registrarIcones(): void {
    // Ícone do Google (versão SVG)
    this.iconRegistry.addSvgIcon(
      'google',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg')
    );

    // Ícone do Facebook (versão SVG)
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg')
    );

    // Ícone do GitHub (exemplo adicional)
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg')
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.carregando = true;

      // Simula tempo de autenticação
      setTimeout(() => {
        console.log('Login realizado:', this.loginForm.value);
        this.carregando = false;
        this.router.navigate(['/']);
      }, 1500);
    }
  }

  recuperarSenha(): void {
    console.log('Redirecionar para recuperação de senha');
    // this.router.navigate(['/recuperar-senha']);
  }

  loginComRedeSocial(rede: string): void {
    console.log(`Login com ${rede}`);
    this.carregando = true;

    setTimeout(() => {
      this.carregando = false;
      this.router.navigate(['/']);
    }, 1500);
  }
}
