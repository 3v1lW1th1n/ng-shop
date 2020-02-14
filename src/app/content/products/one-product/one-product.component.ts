import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductsService } from '@shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';

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
