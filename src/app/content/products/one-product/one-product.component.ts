import { Store } from '@ngrx/store';
import { Component, ComponentFactoryResolver, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../store/reducers/products.reducer';
import { IStore } from 'src/app/store/reducers';
import { ModalService } from '@modal/modal.service';
import { CardConfirmModalComponent } from '../card/card-confirm-modal/card-confirm-modal.component';
import { addProductToCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'ng-shop-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent {
  public product$: Observable<IProduct[]> = this.activatedRoute.data.pipe(
    pluck('product'),
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _store: Store<IStore>,
  ) {}
  public addProduct(product: IProduct): void {
    this._modalService.open({
      component: CardConfirmModalComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
      context: {
        product: { ...product },
        save: () => {
          this._store.dispatch(addProductToCart({ product }));
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
}
