import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { OneProductComponent } from './one-product.component';
import { RouterModule } from '@angular/router';
import { ProductGuard } from './product.guard';

@NgModule({
  declarations: [
    OneProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OneProductComponent,
        canActivate: [ProductGuard],
      },
    ]),
  ],
  providers: [ProductGuard],
})
export class OneProductModule {}
