import { IProduct } from 'src/app/content/products/store/reducers/products.reducer';
import { Observable } from 'rxjs';
import { IStore } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { ModalService } from './../../../modal/modal.service';
import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OneProductReviewModalComponent } from './one-product-review-modal/one-product-review-modal.component';
import {
  getProductPending,
  createFeedbackPending,
} from '../store/actions/products.actions';

@Component({
  selector: 'ng-shop-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private _modalService: ModalService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private store: Store<IStore>,
  ) {}
  public productId: string = '';
  public product$: Observable<IProduct> = this.store.select('products', 'item');
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => (this.productId = data.id)),
      this.store.dispatch(getProductPending({ id: this.productId }));
  }
  public addFeedback(): void {
    this._modalService.open({
      component: OneProductReviewModalComponent,
      resolver: this._componentFactoryResolver,
      injector: this._injector,
      context: {
        save: (value: any) => {
          this.store.dispatch(
            createFeedbackPending({
              feedback: { product: this.productId, ...value },
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
}
