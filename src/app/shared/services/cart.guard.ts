import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICartProduct, selectProducts } from '../../store/reducers/cart.reducer';
import { switchMap, take } from 'rxjs/operators';
import { go } from '../../store/actions/router.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private readonly store: Store<any>,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.store.select(selectProducts)
      .pipe(
        take(1),
        switchMap((products: ICartProduct[]) => {
          if (Array.isArray(products) && products.length > 0) {
            return of(true);
          }
          this.store.dispatch(go({ path: [''] }));
          return of(false);
        }),
      );
  }
}
