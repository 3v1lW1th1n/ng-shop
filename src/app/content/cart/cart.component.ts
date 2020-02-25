import {
  setCountProductInCart,
  removeProductFromCart,
} from './../../store/actions/cart.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  ICartProduct,
} from 'src/app/store/reducers/cart.reducer';
import {
  incrementProductInCart,
  decrementProductInCart,
} from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'ng-shop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  constructor(private readonly _store: Store<any>) {}

  public cart$: Observable<ICartProduct[]> = this._store.select(selectProducts);

  ngOnInit(): void {}

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
    }
  }

  public removeProductFromCart(product: ICartProduct) {
    this._store.dispatch(removeProductFromCart({ product }));
  }

  public trackById(_index: number, item: ICartProduct) {
    return item._id;
  }
}
