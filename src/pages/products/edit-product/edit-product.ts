import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServices } from '../../../Services/ProductServices/product-services';
import { Category } from '../../../Interfaces/category';

@Component({
  selector: 'app-edit-product',
  imports: [],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditProduct implements OnInit {
  constructor(private router: Router) {}
  productServices = inject(ProductServices);
  category: Category[] = [];
  
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
  
}
