import { IProduct } from './../../shared/services/products.service';
import { ProductsService } from '@shared/services/products.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input()
  public product: IProduct;
}
