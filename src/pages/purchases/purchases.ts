import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SupplierService } from '../../Services/SupplierService/supplier-service';
import { Supplier } from '../../Interfaces/suppliers';
import { Customer } from '../../Interfaces/customers';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { CustomerService } from '../../Services/customer-service';
import { ProductsInterface } from '../../Interfaces/products';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  imports: [],
  templateUrl: './purchases.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './purchases.css',
})
export class Purchases implements OnInit {
  supplierService = inject(SupplierService);
  suppliers: Supplier[] = [];
  ngOnInit(): void {
    this.getSupplier();
    this.allCustomers();
    this.getProd();
  }
  // purchase : Purchases
  url = 'http://localhost:5251/api/Purchase/add';
  url1 = 'http://localhost:5251/api/Purchase/all';
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
  private fb = inject(FormBuilder);
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  productsList: ProductsInterface[] = [];
  customer: Customer[] = [];
  removeItem(index: number) {
    this.items.removeAt(index);
  }
  allCustomers() {
    this.customerService.getCustomer().subscribe({
      next: (value: Customer[]) => (this.customer = value),
      error: (err) => console.log(err),
    });
  }
  getProd() {
    this.productServices.getProducts().subscribe({
      next: (response: ProductsInterface[]) => (this.productsList = response),
      error: (err) => console.error(err),
    });
  }
  invoiceForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    items: this.fb.array([]), // FormArray of line items
    // total : new FormControl(),
  });
  updatePrice(index: number) {
    const row = this.items.at(index);
    const productId = row.get('productId')!.value;
    const product = this.productsList.find((p) => p.productId === productId);
    if (!product) return;

    row.patchValue({
      sellingPrice: product.price ?? 0,
      // productPrice: product.buyingPrice ?? 0,
    });

    this.recalculateLine(index);
  }
  recalculateLine(index: number) {
    const row = this.items.at(index);
    const qty = +row.get('quantity')!.value || 0;
    const price = +row.get('sellingPrice')!.value || 0;
    row.patchValue({ lineTotal: qty * price }, { emitEvent: false });
  }
  closeInvoiceModal() {
    this.showInvoiceModal = false;
  }
  showInvoiceModal: boolean = false;
  openInvoiceModal() {
    this.showInvoiceModal = true;
  }
  addItem() {
    const group = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      sellingPrice: [0, Validators.required],
      productPrice: [0],
      lineTotal: [0],
    });
    this.items.push(group);
  }
}
