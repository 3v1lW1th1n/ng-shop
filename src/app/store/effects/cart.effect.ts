import {
  addProductToCart,
  incrementProductInCart,
  decrementProductInCart,
} from './../actions/cart.actions';
import { IStore } from 'src/app/store/reducers';
import { map, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { removeProductFromCart } from '../actions/cart.actions';
import { Store } from '@ngrx/store';
import { selectProducts } from '../reducers/cart.reducer';
import { go } from '../actions/router.actions';
import { LocalStorageService } from '@shared/services/localStorage.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions: Actions,
    private store: Store<IStore>,
    private localStorageService: LocalStorageService,
  ) {}

  public removeProduct$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(removeProductFromCart),
      withLatestFrom(this.store.select(selectProducts)),
      filter(([, products]) => products.length < 1),
      map(() => {
        return go({ path: ['/products'] });
      }),
    ),
  );

  public toLocalStorage$: Observable<any> = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          removeProductFromCart,
          addProductToCart,
          incrementProductInCart,
          decrementProductInCart,
        ),
        withLatestFrom(this.store.select(selectProducts)),
        tap(([, products]) => {
          this.localStorageService.addToLocalStorage('cart', products);
        }),
      ),
    { dispatch: false },
  );
}
