import { IStore } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { createFeedbackPending } from '../store/actions/products.actions';
import { addProductToCart } from 'src/app/store/actions/cart.actions';
import { IProduct, IFeedback } from '@product-store/reducers/products.reducer';
import { ModalService } from '@modal/modal.service';

@Component({
  selector: 'ng-shop-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent {
  constructor(
    private _modalService: ModalService,
    private store: Store<IStore>,
  ) {
  }

  public product$: Observable<IProduct> = this.store.select('products', 'item');

  public async addFeedback(): Promise<void> {
    const component = await import('./one-product-review-modal/one-product-review-modal.component');
    this._modalService.open({
      component: component.OneProductReviewModalComponent,
      context: {
        save: (value: IFeedback) => {
          this.store.dispatch(
            createFeedbackPending({
              feedback: { ...value },
            }),
          );
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }

  public async addProduct(product: IProduct): Promise<void> {
    const component = await import('../card/card-confirm-modal/card-confirm-modal.component');
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
