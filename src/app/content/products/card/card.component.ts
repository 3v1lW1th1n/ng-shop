import {
  Component,
  Input,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';

import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { ModalService } from '../../../modal/modal.service';
import { IProduct } from '@shared/services/products.service';

@Component({
  selector: 'app-card',
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
  ) {}

  public addProduct(product: IProduct): void {
    this._modalService.open({
      component: CardConfirmModalComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
      context: {
        product: { ...product },
        save: () => {
          // this.store.dispatch(new AddProductToCart(product));
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
}
