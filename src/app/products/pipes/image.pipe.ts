import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string | null | string[]): string {
    console.log({ value });

    if (value === null) {
      return './assets/images/no-image.jpg';
    }

    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return './assets/images/no-image.jpg';
    }

    return `${baseUrl}/files/product/${image}`;
  }
}
