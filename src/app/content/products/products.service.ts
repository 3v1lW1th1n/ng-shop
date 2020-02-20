import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './store/reducers/products.reducer';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(search: any): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products`, { params: search });
  }
}
