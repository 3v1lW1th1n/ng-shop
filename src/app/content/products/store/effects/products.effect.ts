import { getProductsSuccess } from './../actions/products.actions';

import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { getProductsPending } from '../actions/products.actions';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../products.service';
import { IProduct } from '../reducers/products.reducer';
import { go } from '../../../../store/actions/router.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {
  }

  public getProducts$: Observable<any> = createEffect(() =>
    this.actions
      .pipe(
        ofType(getProductsPending),
        switchMap(({type, ...search}) => {
          return this.productsService.getProducts(search)
            .pipe(
              mergeMap((products: IProduct[]) => {
                console.log(search)
                return [go({
                  path: [],
                  query: search,
                  extras: { queryParamsHandling: 'merge' },
                }), getProductsSuccess({ products })];
              }),
              catchError((err) => {
                console.log(err);
                return EMPTY;
              }),
            );
        }),
      ),
  );
}
