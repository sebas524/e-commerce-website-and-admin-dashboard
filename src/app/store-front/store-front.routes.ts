import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SexPageComponent } from './pages/sex-page/sex-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'gender/:gender',
        component: SexPageComponent,
      },
      {
        path: 'product/:id',
        component: ProductPageComponent,
      },
      {
        path: '**',
        loadComponent: () => {
          return import('./pages/not-found-page/not-found-page.component').then(
            (m) => {
              return m.NotFoundPageComponent;
            }
          );
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
