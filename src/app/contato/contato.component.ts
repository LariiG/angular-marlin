import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  enviar(): void {
    if (this.formulario.valid) {
      console.log('Formulário enviado:', this.formulario.value);
      this.snackBar.open('Mensagem enviada com sucesso!', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });
      this.formulario.reset();
    } else {
      this.snackBar.open(
        'Por favor, preencha todos os campos corretamente',
        'Fechar',
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
        }
      );
    }
  }
}
