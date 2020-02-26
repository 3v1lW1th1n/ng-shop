import { trueProductsCount } from './../store/reducers/cart.reducer';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ng-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public productCount$!: Observable<number>;

  constructor(private readonly store: Store<any>) {}

  ngOnInit(): void {
    this.productCount$ = this.store.select(trueProductsCount);
  }
}
