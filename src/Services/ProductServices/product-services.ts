import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsInterface } from '../../Interfaces/products';
import { Observable } from 'rxjs';
import { Category } from '../../Interfaces/category';
import { Delete, Edit } from '../../Interfaces/delete';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  url = 'http://localhost:5251/api/Products';
  url1 = 'http://localhost:5251/api/Category/all';
  url2 = 'http://localhost:5251/api/Products/delete';
  url3 = 'http://localhost:5251/api/Products/edit';
  http = inject(HttpClient);
  // productsList: ProductsInterface[] = [];
  constructor(public router: Router) {}

  productsLists: any = {
    productName: '',
    productImage: '',
    productDescription: '',
    price: '',
    stockQuantity: '',
  };
  getProducts(): Observable<ProductsInterface[]> {
    return this.http.get<ProductsInterface[]>(this.url);
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url1);
  }

  DeleteProduct(productName: string): Observable<Delete[]> {
    return this.http.delete<Delete[]>(`${this.url2}/${productName}`);
  }
  viewDelete(products: any) {
    console.log('clicked');
    this.productsLists = products;
    console.log(products);
  }

  editProduct(dto: any): Observable<any> {
    const id = dto.productId;

    const payload = {
      productId: Number(dto.productId),
      productName: dto.productName,
      productImage: dto.productImage,
      productDescription: dto.productDescription,
      price: Number(dto.price),
      stockQuantity: Number(dto.stockQuantity),
      categoryId: Number(dto.categoryId),
    };

    return this.http.put(`${this.url}/${id}`, payload);
  }
}
