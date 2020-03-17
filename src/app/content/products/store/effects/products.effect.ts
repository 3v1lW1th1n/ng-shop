import { IStore } from 'src/app/store/reducers';
import { IProduct } from 'src/app/content/products/store/reducers/products.reducer';
import {
  getProductsSuccess,
  getProductSuccess,
  getProductPending,
  getProductsPending,
  createFeedbackPending,
  createFeedbackSuccess,
  getProductsPagingSuccess,
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

import { Store } from '@ngrx/store';
import { go } from '@root-store/actions/router.actions';
import { ProductsService } from '../../products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private store: Store<IStore>,
  ) {}

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
            const { page, ...searchWithoutPage } = search;
            return [
              go({
                path: [],
                query: searchWithoutPage,
                extras: { queryParamsHandling: null },
              }),
              page === 1
                ? getProductsSuccess({ products })
                : getProductsPagingSuccess({ products }),
            ];
          }),
          catchError(err => {
            // tslint:disable-next-line:no-console
            console.log(err);
            return EMPTY;
          }),
        );
      }),
    ),
  );
}
