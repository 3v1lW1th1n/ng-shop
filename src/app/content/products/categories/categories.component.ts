import { ISubcategory } from './../../../store/reducers/categories.reducer';
import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/store/reducers/categories.reducer';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-categories',
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
  public categories!: ICategory[];
  public isOpen = false;
  public currentSubCategory: any;
  public defaultValue = { name: 'Все категории' };
  public onChange!: Function;

  writeValue(_id: string): void {
    const currentCategory = this.categories.find((category: ICategory) =>
      category.subCategories.find((sub: ISubcategory) => sub._id === _id),
    );
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
    this.categoryToggle();
    this.onChange(this.currentSubCategory._id);
  }
}
