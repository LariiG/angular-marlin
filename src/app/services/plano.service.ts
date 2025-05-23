import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  throwError,
  BehaviorSubject,
  combineLatest,
  of,
} from 'rxjs';
import {
  map,
  shareReplay,
  catchError,
  tap,
  distinctUntilChanged,
  delay,
} from 'rxjs/operators';
import { Plano } from '../models/plano.model';

@Injectable({ providedIn: 'root' })
export class PlanoService {
  private http = inject(HttpClient);
  private planos$: Observable<Plano[]>;
  private filtroSubject = new BehaviorSubject<string>('');
  private ordenacaoSubject = new BehaviorSubject<{
    campo: keyof Plano;
    direcao: 'asc' | 'desc';
  }>({
    campo: 'valor',
    direcao: 'asc',
  });

  constructor() {
    this.planos$ = this.http.get<Plano[]>('/assets/data/planos.json').pipe(
      tap(() => console.log('Dados dos planos carregados')),
      catchError((error) => {
        console.error('Erro ao carregar planos:', error);
        return of([]); // Retorna array vazio em caso de erro
      }),
      shareReplay(1)
    );
  }

  getPlanosFiltrados(): Observable<Plano[]> {
    return combineLatest([
      this.planos$,
      this.filtroSubject.pipe(distinctUntilChanged()),
      this.ordenacaoSubject.pipe(distinctUntilChanged()),
    ]).pipe(
      map(([planos, filtro, ordenacao]) => {
        console.log('Dados:', { planos, filtro, ordenacao });
        if (!planos) return [];

        // Filtragem
        const termo = filtro.toLowerCase();
        let planosFiltrados = planos.filter(
          (plano) =>
            plano.nome.toLowerCase().includes(termo) ||
            plano.descricao.toLowerCase().includes(termo)
        );

        // Ordenação segura
        if (ordenacao.campo && this.isValidSortField(ordenacao.campo)) {
          planosFiltrados = [...planosFiltrados].sort((a, b) => {
            const valorA = a[ordenacao.campo];
            const valorB = b[ordenacao.campo];

            if (typeof valorA === 'number' && typeof valorB === 'number') {
              return ordenacao.direcao === 'asc'
                ? valorA - valorB
                : valorB - valorA;
            }

            if (typeof valorA === 'string' && typeof valorB === 'string') {
              return ordenacao.direcao === 'asc'
                ? valorA.localeCompare(valorB)
                : valorB.localeCompare(valorA);
            }

            return 0;
          });
        }

        return planosFiltrados;
      })
    );
  }

  private isValidSortField(campo: string): campo is keyof Plano {
    return ['nome', 'valor', 'descricao', 'destaque'].includes(campo);
  }

  atualizarFiltro(termo: string): void {
    this.filtroSubject.next(termo);
  }

  atualizarOrdenacao(campo: keyof Plano, direcao: 'asc' | 'desc'): void {
    this.ordenacaoSubject.next({ campo, direcao });
  }

  getPlanosDestacados(): Observable<Plano[]> {
    return this.planos$.pipe(
      map((planos) => (planos ? planos.filter((plano) => plano.destaque) : []))
    );
  }
  getDetalhesPlano(id: string): Observable<Plano | undefined> {
    return this.planos$.pipe(
      map((planos) => {
        const planoEncontrado = planos.find((plano) => plano.id === id);
        if (!planoEncontrado) {
          throw new Error('Plano não encontrado');
        }
        return planoEncontrado;
      }),
      catchError((error) => {
        console.error('Erro ao buscar detalhes:', error);
        return throwError(
          () => new Error(error.message || 'Falha ao obter detalhes')
        );
      })
    );
  }

  confirmarContratacao(plano: {
    id: string;
  }): Observable<{ message: string; plano: any }> {
    return this.http.post<{ message: string; plano: any }>('/api/contratacao', {
      id: plano.id,
    });
  }
}
