import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { CategoriesService } from '@shared/services/categories.service';
import {
  getCategoriesPending,
  getCategoriesSuccess,
} from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions: Actions,
    private categoriesService: CategoriesService,
  ) {}

  public getCategories$: Observable<any> = createEffect(() =>
    this.actions.pipe(
      ofType(getCategoriesPending),
      switchMap(() => {
        return this.categoriesService.getCategories().pipe(
          map(categories => {
            return getCategoriesSuccess({ categories });
          }),
        );
      }),
    ),
  );
}
