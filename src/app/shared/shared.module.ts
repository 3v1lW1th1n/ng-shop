import { ProductsService } from '@shared/services/products.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
@NgModule({
  exports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
        ProductsService,
      ],
    };
  }
}
