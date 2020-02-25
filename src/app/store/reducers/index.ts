import { ICategoryState, reducerCategories } from './categories.reducer';
import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';

import { ICartProduct, reducerCart } from './cart.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src';
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

//
// export function storageMetaReducer(reducer: ActionReducer<IStore>) {
//   return (state: S, action: A) => {
//     // reduce the nextState.
//     console.log('ACTION', action);
//     console.log('STATE', state);
//     if (action.type === '@ngrx/store/init') {
//       console.log('CART', localStorage.getItem('cart'));
//     }
//     const nextState = reducer(state, action);
//     return nextState;
//   };
// }
//
// export const metaReducers: MetaReducer<IStore>[] = [storageMetaReducer];