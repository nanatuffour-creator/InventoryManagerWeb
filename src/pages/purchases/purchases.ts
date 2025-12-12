import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SupplierService } from '../../Services/SupplierService/supplier-service';
import { Supplier } from '../../Interfaces/suppliers';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { CustomerService } from '../../Services/customer-service';
import { ProductsInterface } from '../../Interfaces/products';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { GetPurchaseDto, Purchase, Status } from '../../Interfaces/purchases';
import { PurchaseService } from '../../Services/purchase-service';

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
    this.getPurchases();
    this.getCompletedPurchases();
    this.getPendingPurchases();
    this.getTotalAmountOfPurchases();
    this.getCompletedPurchase();
    this.getPendingPurchase();
    this.getDelayedPurchase();
  }

  onSelectedChange(event: Event) {
    const selected = event.target as HTMLSelectElement;
    if (selected.value === 'all') {
      this.changeAllPurchase();
    } else if (selected.value === 'completed') {
      this.changeCompletedPurchase();
    } else if (selected.value === 'pending') {
      this.changePendingPurchase();
    } else if (selected.value === 'delayed') {
      this.changeDelayedPurchase();
    }
  }

  alls: boolean = true;
  change: boolean = true;
  changes: boolean = true;
  changed: boolean = true;
  changeAllPurchase() {
    this.alls = !this.alls;
  }
  changeCompletedPurchase() {
    this.change = !this.change;
  }
  changePendingPurchase() {
    this.changes = !this.changes;
  }
  changeDelayedPurchase() {
    this.changed = !this.changed;
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
  public readonly Stat = Status;
  Status = Status;
  url = 'http://localhost:5251/api/Purchase/add';
  completedPurchase: GetPurchaseDto[] = [];
  getCompletedPurchase() {
    this.purchaseService.getCompletedPurchase().subscribe({
      next: (value: GetPurchaseDto[]) => {
        this.completedPurchase = value;
      },
    });
  }
  pendingPurchase: GetPurchaseDto[] = [];
  delayedPurchase: GetPurchaseDto[] = [];
  getPendingPurchase() {
    this.purchaseService.getPendingPurchase().subscribe({
      next: (value: GetPurchaseDto[]) => {
        this.pendingPurchase = value;
      },
    });
  }
  getDelayedPurchase() {
    this.purchaseService.getDelayedPurchase().subscribe({
      next: (value: GetPurchaseDto[]) => {
        this.delayedPurchase = value;
      },
    });
  }
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
  allpurchases: GetPurchaseDto[] = [];
  getPurchases() {
    this.purchaseService.getPurchase().subscribe({
      next: (response: GetPurchaseDto[]) => {
        this.allpurchases = response;
        console.log(response);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  completed: any;
  getCompletedPurchases() {
    this.customerService.http.get('http://localhost:5251/api/Purchase/completed').subscribe({
      next: (value) => {
        this.completed = value;
      },
    });
  }
  pending: any;
  getPendingPurchases() {
    this.customerService.http.get('http://localhost:5251/api/Purchase/pending').subscribe({
      next: (value) => {
        this.pending = value;
      },
    });
  }
  totalAmount: any;
  getTotalAmountOfPurchases() {
    this.customerService.http.get('http://localhost:5251/api/Purchase/total').subscribe({
      next: (value) => {
        this.totalAmount = value;
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
  private purchaseService = inject(PurchaseService);
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

  showModal = false;
  selectedInvoice: any = this.allpurchases;
  openModal(item: any) {
    this.selectedInvoice = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
