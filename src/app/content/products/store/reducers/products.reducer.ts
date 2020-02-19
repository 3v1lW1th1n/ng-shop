import { createReducer, on } from '@ngrx/store';
import {
  getProductPending,
  getProductSuccess,
  getProductError,
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
const productReducer = createReducer(
  {
    items: [],
    loading: false,
  },
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  on(getProductSuccess, (_state: IProductState, { products }) => ({
    items: products,
    loading: false,
  })),
  on(getProductError, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
);

export function reducer(state: IProductState | undefined, action: any) {
  return productReducer(state, action);
}
