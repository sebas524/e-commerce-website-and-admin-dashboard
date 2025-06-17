import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ImagePipe } from '../../pipes/image.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-table',
  imports: [ImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent {
  products = input.required<Product[]>();
}
