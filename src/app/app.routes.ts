import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./store-front/store-front.routes').then((m) => {
        return m.storeFrontRoutes;
      });
    },
  },
];
