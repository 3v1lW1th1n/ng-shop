import { IProduct } from 'src/app/content/products/store/reducers/products.reducer';
import {
  getProductsSuccess,
  getProductSuccess,
  getProductPending,
  getProductsPending,
  createFeedbackPending,
  createFeedbackSuccess,
} from './../actions/products.actions';

import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { switchMap, catchError, mergeMap, map } from 'rxjs/operators';
import { ProductsService } from '../../products.service';

import { go } from '../../../../store/actions/router.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
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
      switchMap(({ feedback }) =>
        this.productsService
          .createFeedback(feedback)
          .pipe(
            mergeMap(() => [
              createFeedbackSuccess(),
              getProductPending({ id: feedback.product }),
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
            return [
              go({
                path: [],
                query: search,
                extras: { queryParamsHandling: 'merge' },
              }),
              getProductsSuccess({ products }),
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
