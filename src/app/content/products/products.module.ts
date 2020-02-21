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
import { reducerCategories } from 'src/app/store/reducers/categories.reducer';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    CardComponent,
    ProductsComponent,
    CardConfirmModalComponent,
    CategoriesComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature('categories', reducerCategories),
  ],
  entryComponents: [CardConfirmModalComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
