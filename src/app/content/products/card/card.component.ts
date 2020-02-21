import {
  Component,
  Input,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';

import { CardConfirmModalComponent } from './card-confirm-modal/card-confirm-modal.component';
import { ModalService } from '../../../modal/modal.service';
import { IProduct } from '../store/reducers/products.reducer';

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
  ) {}

  public addProduct(product: IProduct): void {
    this._modalService.open({
      component: CardConfirmModalComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
      context: {
        product: { ...product },
        save: () => {
          this._modalService.close();
        },
        close: () => {
          this._modalService.close();
        },
      },
    });
  }
}
