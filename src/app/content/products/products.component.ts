import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService, IProduct } from '@shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent {
  public products$: Observable<IProduct[]> = this.productsService.getProducts;
  constructor(private productsService: ProductsService) {}
}