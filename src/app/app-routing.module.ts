import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    redirectTo: 'cart',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./content/products/products.module').then(
        mod => mod.ProductsModule,
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./content/cart/cart.module').then(mod => mod.CartModule),
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
export class AppRoutingModule {}
