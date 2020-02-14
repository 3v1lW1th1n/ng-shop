import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './content/header/header.component';
import { ProductsService } from '@shared/services/products.service';
import { ModalModule } from './content/modal/modal.module';
import { CardComponent } from './content/card/card.component';
import { OneProductComponent } from './content/card/one-product/one-product.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, CardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
