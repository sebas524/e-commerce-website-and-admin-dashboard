import { Routes } from '@angular/router';
import { unauthenticatedGuard } from './auth/guards/unauthenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => {
      return import('./auth/auth.routes').then((m) => {
        return m.authRoutes;
      });
    },
    canMatch: [unauthenticatedGuard],
  },
  {
    path: 'admin',
    loadChildren: () => {
      return import('./admin-dashboard/admin-dashboard.routes').then((m) => {
        return m.adminDashboardRoutes;
      });
    },
  },
  {
    path: '',
    loadChildren: () => {
      return import('./store-front/store-front.routes').then((m) => {
        return m.storeFrontRoutes;
      });
    },
  },
];
