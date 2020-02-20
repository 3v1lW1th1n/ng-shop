import { ICategory } from './../reducers/categories.reducer';
import { createAction, props } from '@ngrx/store';

export const getCategoriesPending = createAction(
  '[Categories] Get categories pending',
);
export const getCategoriesSuccess = createAction(
  '[Categories] Get categories success',
  props<{ categories: ICategory[] }>(),
);
export const getCategoriesError = createAction(
  '[Categories] Get categories error',
);
