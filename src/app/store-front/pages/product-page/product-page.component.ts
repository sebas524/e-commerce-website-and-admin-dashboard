import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [CarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdOrSlug: string = this.activatedRoute.snapshot.params['id'];

  productResource = rxResource({
    request: () => {
      return { idOrSlug: this.productIdOrSlug };
    },
    loader: ({ request }) => {
      return this.productsService.getProductByIdOrSlug(request.idOrSlug);
    },
  });
}
