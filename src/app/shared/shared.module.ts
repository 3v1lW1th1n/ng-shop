import { ImgUrlPipe } from './pipes/img-url.pipe';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InterceptorService } from './services/interceptor.service';
import { BASE_URL_TOKEN } from '../config';
import { CategoriesService } from './services/categories.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CartResolverService } from '@shared/services/cart-resolver.service';

@NgModule({
  declarations: [ImgUrlPipe],
  exports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    ImgUrlPipe,
    ReactiveFormsModule
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
        CategoriesService,
        CartResolverService,
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
    };
  }
}
