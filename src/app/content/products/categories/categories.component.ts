import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng-shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CategoriesComponent,
      multi: true,
    },
  ],
})
export class CategoriesComponent implements ControlValueAccessor {
  @Input()
  public categories: ICategory[] = [];
  public isOpen = false;
  public currentSubCategory!: any;
  public defaultValue = { name: 'Все категории' };
  public onChange!: Function;

  writeValue(_id: string): void {
    let currentCategory;
    for (const category of this.categories) {
      for (const subCategory of category.subCategories) {
        if (subCategory._id === _id) {
          currentCategory = subCategory;
          break;
        }
      }
      if (currentCategory) {
        break;
      }
    }
    this.currentSubCategory = currentCategory || this.defaultValue;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  public categoryToggle() {
    this.isOpen = !this.isOpen;
  }

  public subCategoryToggle(subCategory: any) {
    this.currentSubCategory = subCategory;
    this.onChange(this.currentSubCategory._id);
    this.categoryToggle();
  }
}
