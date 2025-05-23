import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PlanoService } from '../services/plano.service';
import { Observable } from 'rxjs';
import { Plano } from '../models/plano.model';

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
  planos$: Observable<Plano[]> = this.planoService.getPlanosFiltrados();
  carregando = true;
  termoBusca = '';
  carregandoContratacao = false;
  planoSelecionado: Plano | null = null;
  mensagemContratacao: string | null = null;
  contratacaoConcluida = false;
  mensagemSucesso: string | null = null;

  // Opções de ordenação com rótulos acessíveis
  opcoesOrdenacao = [
    {
      valor: 'valor-asc',
      texto: 'Menor Preço',
      ariaLabel: 'Ordenar do menor para o maior preço',
    },
    {
      valor: 'valor-desc',
      texto: 'Maior Preço',
      ariaLabel: 'Ordenar do maior para o menor preço',
    },
    { valor: 'nome-asc', texto: 'Nome: A-Z', ariaLabel: 'Ordenar de A a Z' },
    { valor: 'nome-desc', texto: 'Nome: Z-A', ariaLabel: 'Ordenar de Z a A' },
  ];

  ordenacaoSelecionada = 'valor-asc';
  constructor(private planoService: PlanoService) {}

  ngOnInit(): void {
    this.carregarPlanos();
  }

  carregarPlanos(): void {
    this.carregando = true;
    this.planoService.getPlanosFiltrados().subscribe({
      next: () => (this.carregando = false),
      error: () => {
        this.carregando = false;
      },
      complete: () => (this.carregando = false),
    });
  }

  aplicarFiltro(): void {
    this.planoService.atualizarFiltro(this.termoBusca);
  }

  alterarOrdenacao(): void {
    const [campo, direcao] = this.ordenacaoSelecionada.split('-') as [
      'nome' | 'valor',
      'asc' | 'desc'
    ];
    this.planoService.atualizarOrdenacao(campo, direcao);
  }

  formatarValor(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  limparFiltros(): void {
    this.termoBusca = '';
    this.ordenacaoSelecionada = 'valor-asc';
    this.planoService.atualizarFiltro('');
    this.planoService.atualizarOrdenacao('valor', 'asc');
  }

  trackByPlano(index: number, plano: Plano): string {
    return plano.id;
  }
  fecharModal(): void {
    this.planoSelecionado = null;
  }

  contratarPlano(plano: Plano): void {
    this.planoSelecionado = null;
    this.mensagemContratacao = null;
    this.carregandoContratacao = false;

    this.planoSelecionado = { ...plano };

    console.log(
      '🔘 Plano selecionado para contratação:',
      this.planoSelecionado
    );
  }

  confirmarContratacao(): void {
    if (!this.planoSelecionado) return;

    this.carregandoContratacao = true;
    this.mensagemContratacao = null;

    this.planoService
      .confirmarContratacao({ id: this.planoSelecionado.id })
      .subscribe({
        next: (response: { message: string; plano: any }) => {
          console.log('Contratação realizada:', response.plano);
          this.mensagemContratacao = response.message;
          this.carregandoContratacao = false;

          setTimeout(() => {
            this.planoSelecionado = null;
          }, 2000);
        },
        error: (error) => {
          console.error('Erro:', error);
          this.mensagemContratacao = 'Erro ao confirmar contratação';
          this.carregandoContratacao = false;
        },
      });
  }
}
