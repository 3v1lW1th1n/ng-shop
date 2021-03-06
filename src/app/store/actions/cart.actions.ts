import { createAction, props } from '@ngrx/store';
import { IProduct } from '@product-store/reducers/products.reducer';
import { ICartProduct } from '@root-store/reducers/cart.reducer';

export const addProductToCart = createAction(
  '[Product] Add product to cart',
  props<{ product: IProduct }>(),
);

export const removeProductFromCart = createAction(
  '[Product] Remove product from cart',
  props<{ product: ICartProduct }>(),
);
export const incrementProductInCart = createAction(
  '[Product] Increment product in cart',
  props<{ product: ICartProduct }>(),
);
export const setCountProductInCart = createAction(
  '[Product] Set count product in cart',
  props<{ product: ICartProduct }>(),
);

export const decrementProductInCart = createAction(
  '[Products] Decrement product in cart',
  props<{ product: ICartProduct }>(),
);

export const addAllProductsToCart = createAction(
  '[Product] Add all products to cart',
  props<{ products: ICartProduct[] }>(),
);
