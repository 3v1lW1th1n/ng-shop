import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModalModule } from './modal/modal.module';
import { OneProductReviewModalComponent } from './content/products/one-product/one-product-review-modal/one-product-review-modal.component';
import { StoreModule } from '@ngrx/store';
import { CustomRouterSerializer, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@env/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { effects } from './store/effects';
import { CartComponent } from './content/cart/cart.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, OneProductReviewModalComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, {
      // metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterSerializer,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
