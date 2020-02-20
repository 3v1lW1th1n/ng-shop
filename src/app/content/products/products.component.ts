import { FormGroup, FormBuilder } from '@angular/forms';
import { ICategory } from './../../store/reducers/categories.reducer';
import { IStore } from 'src/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductState } from './store/reducers/products.reducer';
import { Store } from '@ngrx/store';
import { getProductsPending } from './store/actions/products.actions';
import { getCategoriesPending } from 'src/app/store/actions/categories.actions';
import { ActivatedRoute } from '@angular/router';
import { pluck, withLatestFrom } from 'rxjs/operators';
import { go } from '../../store/actions/router.actions';

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

  constructor(
    private store: Store<IStore & { products: IProductState }>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        pluck('params'),
        withLatestFrom(this.categories$),
      )
      .subscribe((query: any) => {
        //TODO need wait categories;
        this.store.dispatch(getProductsPending(query));
        this.filterForm.patchValue(query, { emitEvent: false });
      });
    this.products$ = this.store.select('products', 'items');
    this.categories$ = this.store.select('categories', 'items');
    this.store.dispatch(getCategoriesPending());
  }

  public getProducts(search: any): void {
    const validSearch = Object.entries(search).reduce((obj, [key, value]) => {
      if (!value) {
        return obj;
      }
      return { ...obj, [key]: value };
    }, {});
    this.store.dispatch(go({
      path: [],
      query: validSearch,
      extras: {},
    }));
  }
}
