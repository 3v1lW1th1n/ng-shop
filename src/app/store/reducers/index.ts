import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';

import { ICartProduct, reducerCart } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src';
import { IProductState } from '@product-store/reducers/products.reducer';
import { ICategoryState, reducerCategories } from './categories.reducer';

export interface IStore {
  products: IProductState;
  categories: ICategoryState;
  cart: EntityState<ICartProduct>;
  routerReducer: typeof routerReducer;
}

export const reducers: ActionReducerMap<any> = {
  categories: reducerCategories,
  cart: reducerCart,
};

export interface IRouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export class CustomRouterSerializer
  implements RouterStateSerializer<IRouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
