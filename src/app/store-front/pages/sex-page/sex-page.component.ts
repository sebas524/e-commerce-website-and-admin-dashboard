import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { PaginationService } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-sex-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './sex-page.component.html',
  styleUrl: './sex-page.component.css',
})
export class SexPageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  activatedRoute = inject(ActivatedRoute);
  gender = toSignal(
    this.activatedRoute.params.pipe(
      map(({ gender }) => {
        return gender;
      })
    )
  );

  productsResource = rxResource({
    request: () => {
      return {
        gender: this.gender(),
        page: this.paginationService.currentPage() - 1,
      };
    },
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9,
      });
    },
  });
}
