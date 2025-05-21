import { InicioComponent } from './inicio/inicio.component'; // Renomeie o componente se necessário
import { PlanosComponent } from './planos/planos.component';
import { ContatoComponent } from './contato/contato.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Você precisará criar este componente

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'planos', component: PlanosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'login', component: LoginComponent }, // Nova rota
];
