import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardConfirmModalComponent } from './card/card-confirm-modal/card-confirm-modal.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './card/card.component';
import { ProductsComponent } from './products.component';
import { ProductsService } from './products.service';
import { ProductsEffects } from './store/effects/products.effect';
import { reducer } from './store/reducers/products.reducer';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselDirective } from './carousel.directive';

@NgModule({
  declarations: [
    CardComponent,
    ProductsComponent,
    CardConfirmModalComponent,
    CategoriesComponent,
    CarouselDirective,
    CarouselComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  entryComponents: [CardConfirmModalComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
