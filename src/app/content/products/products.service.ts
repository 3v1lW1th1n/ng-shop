import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '@product-store/reducers/products.reducer';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(search: any): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/products`, { params: search });
  }

  public getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`/products/${id}`);
  }

  public createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(`/feedbacks`, feedback);
  }

  public prepareQuery(source$: Observable<any>): Observable<any> {
    return source$.pipe(
      map(searchQuery => {
        return Object.entries(searchQuery).reduce((obj, [key, value]) => {
          if (!value) {
            return obj;
          }
          return { ...obj, [key]: value };
        }, {});
      }),
    );
  }
}
