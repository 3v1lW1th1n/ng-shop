import { Component, Input } from '@angular/core';
import { IProduct } from '@shared/services/products.service';
@Component({
  selector: 'app-card-confirm-modal',
  templateUrl: './card-confirm-modal.component.html',
  styleUrls: ['./card-confirm-modal.component.sass'],
})
export class CardConfirmModalComponent {
  @Input()
  public product!: IProduct;
}
