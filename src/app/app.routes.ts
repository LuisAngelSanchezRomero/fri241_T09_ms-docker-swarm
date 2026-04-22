// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form';

export const routes: Routes = [
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: '**', redirectTo: '/usuarios' }
];