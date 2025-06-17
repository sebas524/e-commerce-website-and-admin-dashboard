import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
  styleUrl: './product-admin-page.component.css',
})
export class ProductAdminPageComponent {
  productService = inject(ProductsService);
  // ! to get the current route:
  activatedRoute = inject(ActivatedRoute);
  // !for redirecting:
  router = inject(Router);

  // ! to get the id:
  productId = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => {
        return params['id'];
      })
    )
  );

  // ! fetch product data:
  productResource = rxResource({
    request: () => {
      return { id: this.productId() };
    },
    loader: ({ request }) => {
      return this.productService.getProductById(request.id);
    },
  });

  // ! to redirect user if id is changed to a non-existant one:
  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigateByUrl('/admin/products');
    }
  });
}
