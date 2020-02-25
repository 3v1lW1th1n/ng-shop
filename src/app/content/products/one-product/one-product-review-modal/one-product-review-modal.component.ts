import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    advantages: ['', [Validators.required, Validators.minLength(10)]],
    limitations: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    rate: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) {}
  public close!: () => void;
  public save!: (value: object) => void;

  ngOnInit(): void {}
}
