import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Invoiced, InvoiceDto, InvoiceItemDto } from '../../Interfaces/invoice';
import { Customer } from '../../Interfaces/customers';
import { CustomerService } from '../../Services/customer-service';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { ProductsInterface } from '../../Interfaces/products';
import { Category } from '../../Interfaces/category';

@Component({
  selector: 'app-invoices',
  standalone: true, // <- important
  imports: [ReactiveFormsModule], // OK for standalone
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Invoices implements OnInit {
  closeInvoiceModal() {
    this.showInvoiceModal = false;
  }
  showInvoiceModal: boolean = false;
  openInvoiceModal() {
    this.showInvoiceModal = true;
    this.addItem();
  }
  private http = inject(HttpClient);
  private productServices = inject(ProductServices);
  private customerService = inject(CustomerService);
  private fb = inject(FormBuilder);

  url = 'http://localhost:5251/api/Invoice/add';
  url1 = 'http://localhost:5251/api/Invoice/new';
  // get total(): number {
  //   const qty = this.invoiceObj.get('quantity')?.value || 0;
  //   const price = this.invoiceObj.get('amount')?.value || 0;
  //   return qty * price;
  // }
  productsList: ProductsInterface[] = [];
  customer: Customer[] = [];
  invoiced: Invoiced[] = [];

  // Reactive form using FormBuilder
  invoiceForm: FormGroup = this.fb.group({
    customerId: ['', Validators.required],
    items: this.fb.array([]), // FormArray of line items
    // total : new FormControl(),
  });

  ngOnInit(): void {
    this.allCustomers();
    this.getProd();
    this.getInvoice();
    this.addItem(); // start with one row (optional)
  }

  // Helper to access items FormArray
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Add a new line item
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

  // Remove a line item
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Update sellingPrice & productPrice when user selects a product
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

  // Recalculate a single line and total
  recalculateLine(index: number) {
    const row = this.items.at(index);
    const qty = +row.get('quantity')!.value || 0;
    const price = +row.get('sellingPrice')!.value || 0;
    row.patchValue({ lineTotal: qty * price }, { emitEvent: false });
  }

  // Grand total getter
  get invoiceTotal(): number {
    return this.items.controls
      .map((c) => +c.get('lineTotal')!.value || 0)
      .reduce((a, b) => a + b, 0);
  }

  // Load products
  getProd() {
    this.productServices.getProducts().subscribe({
      next: (response: ProductsInterface[]) => (this.productsList = response),
      error: (err) => console.error(err),
    });
  }

  // Load customers
  allCustomers() {
    this.customerService.getCustomer().subscribe({
      next: (value: Customer[]) => (this.customer = value),
      error: (err) => console.log(err),
    });
  }

  // Load invoices
  getInvoice() {
    this.customerService.getInvoices().subscribe({
      next: (value: Invoiced[]) => (this.invoiced = value),
      error: (err) => console.log(err),
    });
  }

  // Save invoice (build payload like your swagger)
  saveInvoice() {
    const payload = {
      customerId: this.invoiceForm.value.customerId,
      totalAmount: this.invoiceTotal,
      createdAt: new Date().toISOString().split('T')[0],
      items: this.invoiceForm.value.items.map((it: any) => ({
        productId: +it.productId,
        sellingPrice: +it.sellingPrice,
        quantity: +it.quantity,
        productPrice: +it.productPrice,
      })),
    };

    this.http.post(this.url1, payload).subscribe({
      next: (v) => {
        console.log('saved', v);
        alert('Invoice Added Successfully');
        this.getInvoice();
      },
      error: (e) => console.error(e),
    });
  }
}
