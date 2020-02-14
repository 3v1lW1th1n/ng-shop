import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { OneProductComponent } from './one-product.component';
import { RouterModule } from '@angular/router';
import { ProductResolveService } from './product-resolve.service';

@NgModule({
  declarations: [OneProductComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OneProductComponent,
        resolve: {
          product: ProductResolveService,
        },
      },
    ]),
  ],
  providers: [ProductResolveService],
})
export class OneProductModule {}
