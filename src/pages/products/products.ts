import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ProductsInterface } from '../../Interfaces/products';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../Interfaces/category';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Products implements OnInit {
  productServices = inject(ProductServices);

  category: Category[] = [];
  productsList: ProductsInterface[] = [];
  // router: Router;
  constructor(private router: Router) {}
  ngOnInit() {
    this.getProd();
    this.getCat();
  }
  delete: FormGroup = new FormGroup({
    productName: new FormControl(),
  });
  addProducts: FormGroup = new FormGroup({
    productName: new FormControl(),
    productImage: new FormControl(),
    productDescription: new FormControl(),
    price: new FormControl(),
    stockQuantity: new FormControl(),
    categoryId: new FormControl(),
  });

  editProducts: FormGroup = new FormGroup({
    productId: new FormControl(),
    productName: new FormControl(),
    productImage: new FormControl(),
    productDescription: new FormControl(),
    price: new FormControl(),
    stockQuantity: new FormControl(),
    categoryId: new FormControl(),
  });
  viewAddProduct() {
    this.router.navigate(['/add-product']);
  }
  getProd() {
    this.productServices.getProducts().subscribe({
      next: (response: ProductsInterface[]) => {
        this.productsList = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  delProd() {
    const productName = this.delete.value.productName;
    console.log(productName);
    console.log(this.editProducts);
    this.productServices.DeleteProduct(productName).subscribe({
      next: (value) => {
        console.log(value);
        alert(`Product ${productName} deleted.`);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getCat() {
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

  editProduct() {
    const dto = this.editProducts.value;
    productId: Number(this.editProducts.value.productId),
      this.productServices.editProducts(dto).subscribe({
        next: (res) => console.log('Updated:', res),
        error: (err) => console.error('Error:', err),
      });
  }
}
