import { Component } from '@angular/core';
import { ProductsService, IProduct } from '@shared/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'shop';
  public products$: Observable<IProduct[]> = this.productsService.getProducts;
  constructor(private productsService: ProductsService) {}
}
