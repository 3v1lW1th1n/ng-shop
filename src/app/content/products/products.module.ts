import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardConfirmModalComponent } from './card/card-confirm-modal/card-confirm-modal.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './card/card.component';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { reducer } from './store/reducers/products.reducer';
import { ProductsEffects } from './store/effects/products.effect';

@NgModule({
  declarations: [CardComponent, ProductsComponent, CardConfirmModalComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
