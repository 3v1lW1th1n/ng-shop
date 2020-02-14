import { CardRoutingModule } from './card-routing.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { CardComponent } from './card.component';
import { OneProductComponent } from './one-product/one-product.component';

@NgModule({
  declarations: [CardConfirmModalComponent, CardComponent],
  imports: [SharedModule, CardRoutingModule],
  exports: [SharedModule],
  entryComponents: [CardConfirmModalComponent],
})
export class CardModule {}
