import {
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface ContratacaoRequest {
  id: string;
}

export const httpSimulatorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/contratacao')) {
    const body = req.body as ContratacaoRequest;
    const planoId = body.id;

    // Simulação da busca em "banco de dados"
    const planosSimulados = [
      {
        id: '1',
        nome: 'Plano Básico',
        valor: 100,
        descricao: 'Cobertura simples',
      },
      {
        id: '2',
        nome: 'Plano Premium',
        valor: 200,
        descricao: 'Cobertura completa',
      },
    ];

    const planoEncontrado = planosSimulados.find((p) => p.id === planoId);

    if (!planoEncontrado) {
      return of(new HttpResponse({ status: 404 }));
    }

    return of(
      new HttpResponse({
        status: 200,
        body: {
          message: 'Contratação finalizada com sucesso',
          plano: planoEncontrado,
        },
      })
    ).pipe(delay(300));
  }
  return next(req);
};
