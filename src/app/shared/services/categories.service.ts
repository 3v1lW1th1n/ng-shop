import { ICategory } from './../../store/reducers/categories.reducer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`/categories`);
  }
}
