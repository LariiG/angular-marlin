export interface Plano {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  destaque: boolean;
}
export type PlanoOrdenavel = keyof Pick<Plano, 'nome' | 'valor'>;
