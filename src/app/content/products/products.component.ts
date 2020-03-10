import { FormGroup, FormBuilder } from '@angular/forms';
import { IStore } from 'src/app/store/reducers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct, IProductState } from './store/reducers/products.reducer';
import { Store } from '@ngrx/store';
import { getCategoriesPending } from 'src/app/store/actions/categories.actions';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map, skip, withLatestFrom } from 'rxjs/operators';
import {
  getProductsPending,
  removeFromStateProducts,
} from './store/actions/products.actions';
import { ProductsService } from './products.service';
import { ICategory } from '@root-store/reducers/categories.reducer';
import { addProductToCart } from '@root-store/actions/cart.actions';
import { ModalService } from '@modal/modal.service';

@Component({
  selector: 'ng-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products$: Observable<IProduct[]> = this.store.select(
    'products',
    'items',
  );

  public categories$: Observable<ICategory[]> = this.store.select(
    'categories',
    'items',
  );

  public filterForm: FormGroup = this.fb.group({
    text: [''],
    subcategory: [''],
  });

  private pageSequence$$ = new Subject();

  constructor(
    private store: Store<IStore & { products: IProductState }>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private _modalService: ModalService,
  ) {}

  public ngOnInit(): void {
    const filterSequence$ = this.filterForm.valueChanges.pipe(
      skip(1),
      debounceTime(300),
      map(params => ({ ...params, page: 1 })),
    );
    this.productsService
      .prepareQuery(filterSequence$)
      .subscribe((searchQuery: any) => {
        this.store.dispatch(getProductsPending(searchQuery));
      });

    const pagingSequence$ = this.pageSequence$$.pipe(
      withLatestFrom(this.filterForm.valueChanges),
      map(([page, params]: any[]) => ({ ...params, page })),
    );
    this.productsService
      .prepareQuery(pagingSequence$)
      .subscribe((searchQuery: any) => {
        this.store.dispatch(getProductsPending(searchQuery));
      });
    const query = this.activatedRoute.snapshot.queryParams;
    this.filterForm.patchValue(query);
    this.store.dispatch(getCategoriesPending());
  }

  public scroll(isInit: boolean) {
    let { page = 1 } = this.activatedRoute.snapshot.queryParams;
    this.pageSequence$$.next(isInit ? page : ++page);
  }

  public ngOnDestroy(): void {
    this.store.dispatch(removeFromStateProducts());
  }

  public async addProduct(product: IProduct): Promise<void> {
    const component = await import('./card/card-confirm-modal/card-confirm-modal.component')
    this._modalService.open({
      component: component.CardConfirmModalComponent,
      context: {
        product: { ...product },
        save: () => {
          this.store.dispatch(addProductToCart({ product }));
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
}
