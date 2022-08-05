import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public readonly url_product:string='http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url_product);
  }

  public getProductById(id: number): Observable<Product>{
    const url = `${this.url_product}/${id}`;
    return this.http.get<Product>(url);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url_product, product);
  }

  public updateProduct(id: number, product: Product): Observable<Product>{
    const url= `${this.url_product}/${id}`
    return this.http.put<Product>(url, product);
  }

  public deleteProduct(id: number): Observable<{}>{
    const url= `${this.url_product}/${id}`
    return this.http.delete<{}>(url);
  }

}
