import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ICartProduct, selectProducts } from '../../store/reducers/cart.reducer';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { go } from '../../store/actions/router.actions';

@Injectable()
export class CartResolverService implements Resolve<ICartProduct[] | null> {

  constructor(
    private readonly store: Store<any>,
  ) {
  }

  public resolve(): Observable<ICartProduct[] | null> {
    return this.store.select(selectProducts)
      .pipe(
        take(1),
        switchMap((products: ICartProduct[]) => {
          if (Array.isArray(products) && products.length > 0) {
            return of(products);
          }
          this.store.dispatch(go({ path: [''] }));
          return of(null);
        }),
      );
  };

}
