import { LocalStorageService } from './services/localStorage.service';
import { RatePipe } from './pipes/rate.pipes';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { ModuleWithProviders, NgModule, APP_INITIALIZER } from '@angular/core';
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
import { CartGuard } from '@shared/services/cart.guard';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { Store } from '@ngrx/store';
import { addAllProductsToCart } from '../store/actions/cart.actions';

@NgModule({
  declarations: [
    ImgUrlPipe,
    RatePipe,
    StarRatingComponent,
    InfiniteScrollComponent,
  ],
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
    InfiniteScrollComponent,
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
        CartGuard,
        LocalStorageService,
        {
          provide: APP_INITIALIZER,
          useFactory: (
            store: Store<any>,
            localStorageService: LocalStorageService,
          ) => () => {
            const products = localStorageService.getFromLocalStorage('cart');
            store.dispatch(addAllProductsToCart({ products }));
          },
          multi: true,
          deps: [Store, LocalStorageService],
        },
        {
          provide: BASE_URL_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
    };
  }
}
