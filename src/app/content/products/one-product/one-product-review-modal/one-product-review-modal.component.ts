import { Component, Input, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFeedback } from '@product-store/reducers/products.reducer';
import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ng-shop-one-product-review-modal',
  templateUrl: './one-product-review-modal.component.html',
  styleUrls: ['./one-product-review-modal.component.sass'],
})
export class OneProductReviewModalComponent {
  @Input()
  public set feedback(value: IFeedback) {
    if (!value) {
      return;
    }
    this.feedbackForm.patchValue(value);
  }

  constructor(private fb: FormBuilder) {
  }

  public feedbackForm: FormGroup = this.fb.group({
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    limitations: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });

  public close!: () => void;
  public save!: (value: object) => void;

  public getField(name: string) {
    return this.feedbackForm.get(name);
  }
}

@NgModule({
  declarations: [OneProductReviewModalComponent, RatingComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
})
// @ts-ignore
class OneProductReviewModalModule {

}
