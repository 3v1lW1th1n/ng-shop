import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/content/products/products.service';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(images: IProduct['images']): string {
    if (!images) {
      return '';
    }
    const currentImg = images[0];
    if (!currentImg) {
      return '';
    }
    return `${currentImg.url}`;
  }
}
