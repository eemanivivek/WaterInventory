import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  capacity: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.productsSubject.next(this.products);
  }

getProducts(): Observable<Product[]> {
  console.log('getProducts called — current products:', this.products);
  return this.productsSubject.asObservable();
}

addProduct(product: Product): Observable<void> {
  product.id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  this.products.push(product);
  console.log('After adding, products array is now:', this.products);
  this.productsSubject.next([...this.products]);
  return new Observable(observer => {
    observer.next();
    observer.complete();
  });
}



  deleteProduct(id: number): Observable<void> {
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next([...this.products]);
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
}
