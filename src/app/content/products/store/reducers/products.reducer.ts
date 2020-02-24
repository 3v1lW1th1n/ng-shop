import { createReducer, on } from '@ngrx/store';
import {
  getProductsPending,
  getProductsSuccess,
  getProductsError,
  getProductPending,
  getProductSuccess,
} from '../actions/products.actions';

export interface IProductState {
  item: IProduct;
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
    item: { _id: '', description: '', name: '', price: 0, status: false },
    items: [],
    loading: false,
  },
  on(getProductsPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductsSuccess, (state: IProductState, { products }) => ({
    ...state,
    items: products,
    loading: false,
  })),
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
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
