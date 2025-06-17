import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Gender,
  Product,
  ProductsResponse,
} from '../interfaces/product.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/interfaces/user.interface';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

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

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    return this.http.get<Product>(`${environment.baseUrl}/products/${id}`).pipe(
      tap((res) => {
        console.log(res);
      }),
      tap((res) => {
        return this.productCache.set(id, res);
      })
    );
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => {
        return { ...productLike, images: [...currentImages, ...imageNames] };
      }),
      switchMap((updatedProduct) => {
        return this.http.patch<Product>(
          `${environment.baseUrl}/products/${id}`,
          updatedProduct
        );
      }),
      tap((product) => {
        this.updateProductCache(product);
      })
    );
  }

  createProduct(
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => {
        return { ...productLike, images: [...currentImages, ...imageNames] };
      }),
      switchMap((updatedProduct) => {
        return this.http.post<Product>(
          `${environment.baseUrl}/products`,
          updatedProduct
        );
      }),
      tap((product) => {
        this.updateProductCache(product);
      })
    );
  }

  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) {
      return of([]);
    }
    const uploadObservables = Array.from(images).map((imageFile) => {
      return this.uploadImage(imageFile);
    });

    return forkJoin(uploadObservables).pipe(
      tap((imageNames) => {
        console.log({ imageNames });
      })
    );
  }
  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();

    formData.append('file', imageFile);
    return this.http
      .post<{ fileName: string }>(
        `${environment.baseUrl}/files/product`,
        formData
      )
      .pipe(
        map((resp) => {
          return resp.fileName;
        })
      );
  }

  updateProductCache(product: Product) {
    const id = product.id;
    this.productCache.set(id, product);

    this.productsCache.forEach((productRes) => {
      productRes.products = productRes.products.map((currentProduct) => {
        return currentProduct.id === id ? product : currentProduct;
      });
    });
    console.log('cache has been updated');
  }
}
