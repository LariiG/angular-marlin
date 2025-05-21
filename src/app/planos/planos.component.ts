import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PlanoService } from '../services/plano.service';

@Component({
  standalone: true,
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss'],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class PlanosComponent implements OnInit {
  planos$ = this.planoService.getPlanosFiltrados();
  carregando = true;
  termoBusca = '';
  opcoesOrdenacao = [
    { valor: 'valor-asc', texto: 'Menor Preço' },
    { valor: 'valor-desc', texto: 'Maior Preço' },
    { valor: 'nome-asc', texto: 'Nome: A-Z' },
    { valor: 'nome-desc', texto: 'Nome: Z-A' },
  ];
  ordenacaoSelecionada = 'valor-asc';

  constructor(private planoService: PlanoService) {}

  ngOnInit(): void {
    this.planoService.getPlanosFiltrados().subscribe({
      next: () => (this.carregando = false),
      error: () => (this.carregando = false),
    });
  }

  aplicarFiltro(): void {
    this.planoService.atualizarFiltro(this.termoBusca);
  }

  alterarOrdenacao(): void {
    const [campo, direcao] = this.ordenacaoSelecionada.split('-') as [
      'nome' | 'valor', // Tipagem explícita dos campos ordenáveis
      'asc' | 'desc'
    ];
    this.planoService.atualizarOrdenacao(campo, direcao);
  }

  formatarValor(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }
}
