// src/app/models/plano.model.ts
export interface Plano {
  nome: string;
  valor: number;
  descricao: string; // Mudei de 'beneficios' para 'descricao'
  destaque: boolean;
}
export type PlanoOrdenavel = keyof Pick<Plano, 'nome' | 'valor'>;
