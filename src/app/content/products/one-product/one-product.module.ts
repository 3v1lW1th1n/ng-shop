import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { OneProductComponent } from './one-product.component';
import { RouterModule } from '@angular/router';
import { ProductResolveService } from './product-resolve.service';
import { OneProductReviewModalComponent } from './one-product-review-modal/one-product-review-modal.component';
import { RatingComponent } from './one-product-review-modal/rating/rating.component';

@NgModule({
  declarations: [
    OneProductComponent,
    RatingComponent,
    OneProductReviewModalComponent,
  ],
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
