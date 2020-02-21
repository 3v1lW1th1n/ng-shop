import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [SharedModule, CartRoutingModule],
})
export class CartModule {}
