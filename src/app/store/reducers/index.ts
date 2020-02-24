import { reducerCategories } from 'src/app/store/reducers/categories.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { ICategoryState } from './categories.reducer';
import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';

import { EntityState } from '@ngrx/entity';
import { ICartProduct, reducerCart } from './cart.reducer';

export interface IStore {
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
