import { RatePipe } from './pipes/rate.pipes';
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
import { StarRatingComponent } from './components/star-rating/star-rating.component';
@NgModule({
  declarations: [ImgUrlPipe, RatePipe, StarRatingComponent],
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  exports: [
    CommonModule,
    StarRatingComponent,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    ImgUrlPipe,
    RatePipe,
    ReactiveFormsModule,
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
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
    };
  }
}
