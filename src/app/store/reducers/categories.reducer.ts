import { createReducer, on } from '@ngrx/store';
import {
  getCategoriesPending,
  getCategoriesSuccess,
} from '../actions/categories.actions';

export interface ICategoryState {
  items: ICategory[];
  loading: boolean;
}
export interface ICategory {
  name: String;
  _id: String;
  subCategories: ISubcategory[];
}
export interface ISubcategory {
  _id: String;
  name: String;
  idCategory: String;
}
const categoriesReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  on(getCategoriesPending, (state: ICategoryState) => ({
    ...state,
    loading: true,
  })),
  on(getCategoriesSuccess, (state: ICategoryState, { categories }) => ({
    ...state,
    items: categories,
    loading: false,
  })),
);

export function reducerCategories(
  state: ICategoryState | undefined,
  action: any,
) {
  return categoriesReducer(state, action);
}
