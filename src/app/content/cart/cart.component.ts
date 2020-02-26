import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  ICartProduct,
} from 'src/app/store/reducers/cart.reducer';
import {
  incrementProductInCart,
  decrementProductInCart,
  setCountProductInCart,
  removeProductFromCart,
} from 'src/app/store/actions/cart.actions';
import { IStore } from 'src/app/store/reducers';

@Component({
  selector: 'ng-shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent {
  public cart$: Observable<ICartProduct[]> = this._store.select(selectProducts);
  constructor(private readonly _store: Store<IStore>) {}

  public incrementProductInCart(product: ICartProduct) {
    this._store.dispatch(incrementProductInCart({ product }));
  }
  public quantity({ target }: Event, product: ICartProduct) {
    const value = (target as HTMLInputElement).value;
    this._store.dispatch(
      setCountProductInCart({ product: { ...product, count: Number(value) } }),
    );
  }
  public decrementProductInCart(product: ICartProduct) {
    if (product.count > 1) {
      this._store.dispatch(decrementProductInCart({ product }));
      return;
    }
    this._store.dispatch(removeProductFromCart({ product }));
  }
  public removeProductFromCart(product: ICartProduct) {
    this._store.dispatch(removeProductFromCart({ product }));
  }
  public trackById(_index: number, item: ICartProduct) {
    return item._id;
  }
}
