import { CardConfirmModalComponent } from './card/card-confirm-modal/card-confirm-modal.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './card/card.component';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [CardComponent, ProductsComponent, CardConfirmModalComponent],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
