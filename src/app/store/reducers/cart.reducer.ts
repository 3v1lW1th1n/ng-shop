import { IProduct } from 'src/app/content/products/store/reducers/products.reducer';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import {
  addProductToCart,
  removeProductFromCart,
  incrementProductInCart,
  decrementProductInCart,
  setCountProductInCart,
  addAllProductsToCart,
} from '../actions/cart.actions';
import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector,
  createFeatureSelector,
} from '@ngrx/store';

// import { IProduct } from '@product-store/reducers/products.reducer';

export interface ICartProduct extends IProduct {
  count: number;
}

export const cartAdapter: EntityAdapter<ICartProduct> = createEntityAdapter({
  selectId: (product: ICartProduct) => product._id,
});

const initialState: EntityState<ICartProduct> = cartAdapter.getInitialState({});
const cartReducer = createReducer(
  initialState,
  on(addProductToCart, (state: EntityState<ICartProduct>, { product }) => {
    const entity: ICartProduct | undefined = state.entities[product._id];
    return cartAdapter.upsertOne(
      {
        ...product,
        count: entity ? entity.count + 1 : 1,
      },
      state,
    );
  }),
  on(addAllProductsToCart, (state: EntityState<ICartProduct>, { products }) => {
    return cartAdapter.addAll(products, state);
  }),
  on(removeProductFromCart, (state: EntityState<ICartProduct>, { product }) => {
    return cartAdapter.removeOne(product._id, state);
  }),
  on(
    incrementProductInCart,
    (state: EntityState<ICartProduct>, { product }) => {
      return cartAdapter.updateOne(
        {
          id: product._id,
          changes: { count: product.count + 1 },
        },
        state,
      );
    },
  ),
  on(setCountProductInCart, (state: EntityState<ICartProduct>, { product }) => {
    return cartAdapter.updateOne(
      {
        id: product._id,
        changes: { count: product.count },
      },
      state,
    );
  }),
  on(
    decrementProductInCart,
    (state: EntityState<ICartProduct>, { product }) => {
      return cartAdapter.updateOne(
        {
          id: product._id,
          changes: { count: product.count - 1 },
        },
        state,
      );
    },
  ),
);

export function reducerCart(
  state: EntityState<ICartProduct> | undefined,
  action: any,
) {
  return cartReducer(state, action);
}

export const selectProductsState = createFeatureSelector<
  EntityState<ICartProduct>
>('cart');
export const { selectAll } = cartAdapter.getSelectors();
export const selectProducts = createSelector(selectProductsState, selectAll);

export const trueProductsCount: MemoizedSelector<any, number> = createSelector(
  selectProducts,
  (products: ICartProduct[]) => {
    return products.reduce((count: number, product: ICartProduct) => {
      return (count += product.count);
    }, 0);
  },
);
