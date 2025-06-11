import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${environment.baseUrl}/products`, {
        params: {
          limit: limit,
          offset: offset,
          gender: gender,
        },
      })
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        tap((res) => {
          return this.productsCache.set(key, res);
        })
      );
  }

  getProductByIdOrSlug(idOrSlug: string): Observable<Product> {
    if (this.productCache.has(idOrSlug)) {
      return of(this.productCache.get(idOrSlug)!);
    }

    return this.http
      .get<Product>(`${environment.baseUrl}/products/${idOrSlug}`)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        tap((res) => {
          return this.productCache.set(idOrSlug, res);
        })
      );
  }
}
