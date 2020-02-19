import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
} from '../actions/products.actions';

export interface IProductState {
  items: IProduct[];
  loading: boolean;
}
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  status: boolean;
  images?: any;
}
const productsReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  on(getProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (_state: IProductState, { products }) => ({
    items: products,
    loading: false,
  })),
  on(getProductsError, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
);

export function reducer(state: IProductState | undefined, action: any) {
  return productsReducer(state, action);
}
