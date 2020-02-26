import { IProduct } from 'src/app/content/products/store/reducers/products.reducer';
import {
  getProductsSuccess,
  getProductSuccess,
  getProductPending,
  getProductsPending,
  createFeedbackPending,
  createFeedbackSuccess, getProductsPagingSuccess,
} from './../actions/products.actions';

import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import {
  switchMap,
  catchError,
  mergeMap,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { ProductsService } from '../../products.service';

import { go } from '../../../../store/actions/router.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<any>,
  ) {
  }

  public getProduct$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductPending),
      switchMap(({ id }) =>
        this.productsService
          .getProduct(id)
          .pipe(map((product: IProduct) => getProductSuccess({ product }))),
      ),
    ),
  );
  public addFeedback$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(createFeedbackPending),
      withLatestFrom(this.store.select('products', 'item', '_id')),
      switchMap(([{ feedback }, product]) =>
        this.productsService
          .createFeedback({ ...feedback, product })
          .pipe(
            mergeMap(() => [
              createFeedbackSuccess(),
              getProductPending({ id: product }),
            ]),
          ),
      ),
    ),
  );
  public getProducts$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getProductsPending),
      switchMap(({ type, ...search }) => {
        return this.productsService.getProducts(search).pipe(
          mergeMap((products: IProduct[]) => {
            if (products.length === 0) {
              return [go({
                path: [],
                extras: { queryParamsHandling: 'preserve' },
              })];
            }
            return [
              go({
                path: [],
                query: search,
                extras: { queryParamsHandling: null },
              }),
              search.page === 1 ? getProductsSuccess({ products }) : getProductsPagingSuccess({ products }),
            ];
          }),
          catchError(err => {
            console.log(err);
            return EMPTY;
          }),
        );
      }),
    ),
  );
}
