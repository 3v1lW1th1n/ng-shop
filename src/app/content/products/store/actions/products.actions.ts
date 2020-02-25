import { createAction, props } from '@ngrx/store';
import { IProduct } from '../reducers/products.reducer';

export const getProductsPending = createAction(
  '[Products] Get products pending',
  props<{ text?: string; subcategory?: string }>(),
);
export const getProductsSuccess = createAction(
  '[Products] Get products success',
  props<{ products: IProduct[] }>(),
);
export const getProductsError = createAction('[Products] Get products error');

export const getProductPending = createAction(
  '[Product] Get product pending',
  props<{ id: string }>(),
);
export const getProductSuccess = createAction(
  '[Product] Get product success',
  props<{ product: IProduct }>(),
);

export const createFeedbackPending = createAction(
  '[Feedback] Create feedback pending',
  props<{ feedback: any }>(),
);
export const createFeedbackSuccess = createAction(
  '[Feedback] Create feedback success',
);