import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  map,
  shareReplay,
  catchError,
  tap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Plano } from '../models/plano.model';

@Injectable({ providedIn: 'root' })
export class PlanoService {
  private planos$: Observable<Plano[]>;
  private filtroSubject = new BehaviorSubject<string>('');
  private ordenacaoSubject = new BehaviorSubject<{
    campo: keyof Plano;
    direcao: 'asc' | 'desc';
  }>({
    campo: 'valor',
    direcao: 'asc',
  });

  constructor(private http: HttpClient) {
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
}
