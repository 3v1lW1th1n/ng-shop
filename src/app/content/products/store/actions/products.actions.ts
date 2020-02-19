import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{ text?: string }>(),
);
export const getProductsSuccess = createAction(
  '[Products] Get products success',
  props<{ products: IProduct[] }>(),
);
export const getProductsError = createAction('[Products] Get products error');
