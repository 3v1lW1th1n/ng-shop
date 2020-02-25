import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartResolverService } from '@shared/services/cart-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    redirectTo: 'cart',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./content/products/products.module').then(
        mod => mod.ProductsModule,
      ),
    data: {
      state: 'products',
    },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./content/cart/cart.module').then(mod => mod.CartModule),
    data: {
      state: 'cart',
    },
    resolve: {
      products: CartResolverService,
    },
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
