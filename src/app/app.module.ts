import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './content/header/header.component';
import { CardComponent } from './content/card/card.component';
import { ProductsService } from '@shared/services/products.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CardComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule.forRoot()],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
