import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductsService } from '../../../products/services/products.service';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';

@Component({
  selector: 'app-sex-page',
  imports: [ProductCardComponent],
  templateUrl: './sex-page.component.html',
  styleUrl: './sex-page.component.css',
})
export class SexPageComponent {
  productsService = inject(ProductsService);

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
      return { gender: this.gender() };
    },
    loader: ({ request }) => {
      return this.productsService.getProducts({ gender: request.gender });
    },
  });
}
