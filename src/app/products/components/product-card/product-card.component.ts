import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { SlicePipe } from '@angular/common';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, SlicePipe, ImagePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
