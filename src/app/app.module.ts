import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ModalModule } from './modal/modal.module';
import { OneProductReviewModalComponent } from './content/products/one-product/one-product-review-modal/one-product-review-modal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, OneProductReviewModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
