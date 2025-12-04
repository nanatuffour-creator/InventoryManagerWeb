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
    const form = this.editProducts.value;

    const dto = {
      productId: Number(form.productId),
      productName: form.productName,
      productDescription: form.productDescription,
      productImage: form.productImage,
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      categoryId: Number(form.categoryId),
    };

    this.productServices.editProduct(dto).subscribe({
      next: (res) => {
        console.log('Updated:', res);
        alert("Product Edited Successfully")
        this.getProd();
      },
      error: (err) => console.error('Error:', err),
    });
  }

  openEditDialog(product: any) {
    this.editProducts.patchValue({
      productId: product.productId,
      productName: product.productName,
      productImage: product.productImage,
      productDescription: product.productDescription,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId,
    });
  }
}
