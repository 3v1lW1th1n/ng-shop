import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './store/reducers/products.reducer';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts({ text }: any): Observable<IProduct[]> {
    const query = text ? `text=${text}` : '';
    return this.http.get<IProduct[]>(`/products?${query}`);
  }
}
