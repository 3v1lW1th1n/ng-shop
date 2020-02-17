import { Component, OnInit } from '@angular/core';
import { IProduct } from '@shared/services/products.service';
import { Observable } from 'rxjs';

import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.sass'],
})
export class OneProductComponent implements OnInit {
  public product$: Observable<IProduct[]> = this.activatedRoute.data.pipe(
    pluck('product'),
  );
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
}

// export class OneProductComponent {
//   @Input()
//   public product!: IProduct;

//   @Input()
//   public isOdd!: boolean;

//   public constructor(
//     private _modalService: ModalService,
//     private _componentFactoryResolver: ComponentFactoryResolver,
//     private _injector: Injector,
//   ) {}

//   public addProduct(product: IProduct): void {
//     this._modalService.open({
//       component: OneProductReviewModalComponent,
//       resolver: this._componentFactoryResolver,
//       injector: this._injector,
//       context: {
//         product: { ...product },
//         save: () => {
//           // this.store.dispatch(new AddProductToCart(product));
//           this._modalService.close();
//         },
//         close: () => {
//           this._modalService.close();
//         },
//       },
//     });
//   }
// }
