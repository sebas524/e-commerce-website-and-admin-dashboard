import { Component, inject, signal } from '@angular/core';
import { ProductsTableComponent } from '../../../products/components/products-table/products-table.component';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
  styleUrl: './products-admin-page.component.css',
})
export class ProductsAdminPageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => {
      return {
        page: this.paginationService.currentPage() - 1,
        limit: this.productsPerPage(),
      };
    },
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
        limit: request.limit,
      });
    },
  });
}
