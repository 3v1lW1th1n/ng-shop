import {
  Component,
  Input,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';

import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { ModalService } from '../../../modal/modal.service';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/store/reducers';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { IProduct } from '@product-reducer/products.reducer';

@Component({
  selector: 'ng-shop-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input()
  public product!: IProduct;
  @Input()
  public isOdd!: boolean;

  public constructor(
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
