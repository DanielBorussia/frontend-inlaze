import { Routes } from '@angular/router';
import { loginGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component'),
    children: [],
    canActivate: [loginGuard],
  },
  {
    path: 'my-account',
    loadComponent: () => import('./pages/my-account/my-account.component'),
    children: [],
    canActivate: [loginGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/sign-in-form/sign-in-form.component'),
    children: [],
  },
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },
];
