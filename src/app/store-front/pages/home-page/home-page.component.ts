import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => {
      return { page: this.paginationService.currentPage() - 1 };
    },
    loader: ({ request }) => {
      return this.productsService.getProducts({ offset: request.page * 9 });
    },
  });
}
