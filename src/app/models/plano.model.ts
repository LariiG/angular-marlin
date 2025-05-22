export interface Plano {
  nome: string;
  valor: number;
  descricao: string;
  destaque: boolean;
}
export type PlanoOrdenavel = keyof Pick<Plano, 'nome' | 'valor'>;
