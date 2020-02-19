import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';

export const getProductPending = createAction(
  '[Product] Get products pending',
  props<{ text?: string }>(),
);
export const getProductSuccess = createAction(
  '[Product] Get product success',
  props<{ products: IProduct[] }>(),
);
export const getProductError = createAction('[Product] Get product error');
