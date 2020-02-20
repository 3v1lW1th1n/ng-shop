import { ActionReducerMap } from '@ngrx/store';
import { IProductState } from 'src/app/content/products/store/reducers/products.reducer';
import { ICategoryState } from './categories.reducer';
// tslint:disable-next-line:no-empty-interface
export interface IStore {
  products: IProductState;
  categories: ICategoryState;
}
export const reducers: ActionReducerMap<any> = {};
