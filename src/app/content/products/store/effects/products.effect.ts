import { getProductsSuccess } from './../actions/products.actions';

import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { getProductsPending } from '../actions/products.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ProductsService } from '../../products.service';
import { IProduct } from '../reducers/products.reducer';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private productsService: ProductsService,
  ) {}

  public getProducts$: Observable<any> = createEffect(() =>
    this.actions
    .pipe(
      ofType(getProductsPending),
      switchMap((search) => {
        return this.productsService.getProducts(search)
        .pipe(
          map((products: IProduct[])=>{
          return getProductsSuccess({products})
        }),
        catchError((err)=>{
          console.log(err);
          return EMPTY
        })
        );
      }),
      ),
  );
}
