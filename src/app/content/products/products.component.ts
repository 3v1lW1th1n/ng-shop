import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './store/reducers/products.reducer';
import { Store } from '@ngrx/store';
import { getProductPending } from './store/actions/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<IProduct[]>;
  constructor(private store: Store<any>) {}

  public ngOnInit(): void {
    this.products$ = this.store.select('products', 'items');
    this.store.dispatch(getProductPending({}));
  }

  public getProducts(text: string): void {
    this.store.dispatch(getProductPending({ text }));
  }
}
