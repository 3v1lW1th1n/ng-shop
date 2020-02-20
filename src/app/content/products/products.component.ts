import { FormGroup, FormBuilder } from '@angular/forms';
import { ICategory } from './../../store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './store/reducers/products.reducer';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { getCategoriesPending } from 'src/app/store/actions/categories.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  public products$!: Observable<IProduct[]>;
  public categories$!: Observable<ICategory[]>;
  public filterForm: FormGroup = this.fb.group({
    text: [''],
    subcategory: [''],
  });
  constructor(private store: Store<IStore>, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.products$ = this.store.select('products', 'items');
    this.store.dispatch(getProductsPending({}));

    this.categories$ = this.store.select('categories', 'items');
    this.store.dispatch(getCategoriesPending());
  }

  public getProducts(search: any): void {
    this.store.dispatch(getProductsPending(search));
  }
}
