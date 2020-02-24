import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { pluck } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../store/reducers/products.reducer';

@Component({
  selector: 'ng-shop-one-product',
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
