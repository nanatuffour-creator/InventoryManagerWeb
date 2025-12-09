import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../Interfaces/category';
import { ProductServices } from '../../../Services/ProductServices/product-services';
import { AddProduct } from '../../../Interfaces/add-product';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../Interfaces/user';

@Component({
  selector: 'app-addproducts',
  imports: [ReactiveFormsModule],
  templateUrl: './addproducts.html',
  styleUrl: './addproducts.css',
})
export class Addproducts implements OnInit {
  url = 'http://localhost:5251/api/Products/add';
  http = inject(HttpClient);
  productServices = inject(ProductServices);
  category: Category[] = [];
  addProducts: FormGroup = new FormGroup({
    productName: new FormControl(),
    productImage: new FormControl(),
    productDescription: new FormControl(),
    price: new FormControl(),
    stockQuantity: new FormControl(),
    categoryId: new FormControl(),
  });
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.productServices.getCategory().subscribe({
      next: (response: Category[]) => {
        this.category = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addProduct() {
    console.log();
    const results = this.addProducts.value;

    this.http.post(this.url, results).subscribe({
      next: (value) => {
        console.log(value);
        console.log('Product Added');
        this.router.navigate(['/layout/products']);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  user: User = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    ConfirmPassword: '',
  };
}
