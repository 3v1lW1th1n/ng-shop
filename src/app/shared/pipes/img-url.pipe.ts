import { Pipe, PipeTransform } from '@angular/core';
import { IProductImage } from '@product-store/reducers/products.reducer';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(images: IProductImage[] | undefined): string {
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
