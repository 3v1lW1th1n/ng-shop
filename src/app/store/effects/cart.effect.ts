import { IStore } from 'src/app/store/reducers';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { removeProductFromCart } from '../actions/cart.actions';
import { Store } from '@ngrx/store';
import { selectProducts } from '../reducers/cart.reducer';
import { go } from '../actions/router.actions';

@Injectable()
export class CartEffects {
  constructor(private actions: Actions, private store: Store<IStore>) {}

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
}
