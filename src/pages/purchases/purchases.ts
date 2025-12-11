import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SupplierService } from '../../Services/SupplierService/supplier-service';
import { Supplier } from '../../Interfaces/suppliers';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { CustomerService } from '../../Services/customer-service';
import { ProductsInterface } from '../../Interfaces/products';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Purchase, Status } from '../../Interfaces/purchases';

@Component({
  selector: 'app-purchases',
  imports: [FormsModule],
  templateUrl: './purchases.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './purchases.css',
})
export class Purchases implements OnInit {
  supplierService = inject(SupplierService);
  suppliers: Supplier[] = [];
  ngOnInit(): void {
    this.getSupplier();
    this.getProd();
    this.getPurchase();
  }
  today = new Date().toISOString().split('T')[0];
  purchased: Purchase = {
    purchaseId: 0,
    id: 0,
    amount: 0,
    date: this.today,
    stat: undefined,
    purchaseOrders: [
      {
        purchaseItemId: 0,
        costPrice: 0,
        quantity: 0,
        purchaseId: 0,
        productId: 0,
      },
    ],
  };

  Status = Status;
  url = 'http://localhost:5251/api/Purchase/add';
  url1 = 'http://localhost:5251/api/Purchase/all';

  addPurchase() {
    // debugger
    this.customerService.http.post(this.url, this.purchased).subscribe({
      next(value) {
        // debugger
        console.log(value);
        alert('Purchase Added Successfully');
      },
      error(err) {
        // debugger
        console.log(err);
      },
    });
  }
  allpurchases: any;
  getPurchase() {
    this.customerService.http.get(this.url1).subscribe({
      next: (value) => {
        this.allpurchases = value;
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getSupplier() {
    this.supplierService.getSuppliers().subscribe({
      next: (value: Supplier[]) => {
        this.suppliers = value;
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  private productServices = inject(ProductServices);
  private customerService = inject(CustomerService);

  productsList: ProductsInterface[] = [];

  getProd() {
    this.productServices.getProducts().subscribe({
      next: (response: ProductsInterface[]) => (this.productsList = response),
      error: (err) => console.error(err),
    });
  }

  orderTotals: number[] = [];
  overallTotal: number = 0;

  constructor() {
    this.recalculateTotals();
  }

  addOrder() {
    this.purchased.purchaseOrders.push({
      purchaseItemId: 0,
      costPrice: 0,
      quantity: 0,
      purchaseId: 0,
      productId: 0,
    });

    this.recalculateTotals();
  }

  removeOrder(index: number) {
    this.purchased.purchaseOrders.splice(index, 1);
    this.recalculateTotals();
  }

  recalculateTotals() {
    this.orderTotals = this.purchased.purchaseOrders.map((po) => {
      const cost = po.costPrice || 0;
      const qty = po.quantity || 0;
      return cost * qty;
    });

    this.overallTotal = this.orderTotals.reduce((a, b) => a + b, 0);
    this.purchased.amount = this.overallTotal;
  }

  savePurchase() {
    console.log('Saved purchase:', this.purchased);
  }
}
