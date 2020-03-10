import {
  Component,
  Input, Output, EventEmitter,
} from '@angular/core';

import { IProduct } from '@product-store/reducers/products.reducer';

@Component({
  selector: 'ng-shop-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input()
  public product!: IProduct;
  @Input()
  public isOdd!: boolean;

  @Output()
  public addToCart = new EventEmitter();

  public addProduct(): void {
    this.addToCart.emit();
  }
}
