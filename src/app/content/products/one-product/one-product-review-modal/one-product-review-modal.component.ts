import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ng-shop-one-product-review-modal',
  templateUrl: './one-product-review-modal.component.html',
  styleUrls: ['./one-product-review-modal.component.sass'],
})
export class OneProductReviewModalComponent implements OnInit {
  @Input()
  public set feedback(value: any) {
    if (!value) {
      return;
    }

    this.feedbackForm.patchValue(value);
  }

  public feedbackForm: FormGroup = this.fb.group({
    advantages: [''],
    limitations: [''],
    description: [''],
    rate: [''],
  });
  constructor(private fb: FormBuilder) {}
  public close!: () => void;
  public save!: (value: object) => void;

  ngOnInit(): void {}
}
