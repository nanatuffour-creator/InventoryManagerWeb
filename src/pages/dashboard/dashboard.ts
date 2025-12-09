import { Component, inject, OnInit } from '@angular/core';
import { InvoiceGetDto } from '../../Interfaces/invoice';
import { CustomerService } from '../../Services/customer-service';
import { Customer } from '../../Interfaces/customers';
import { ProductsInterface } from '../../Interfaces/products';
import { ProductServices } from '../../Services/ProductServices/product-services';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  invoices: InvoiceGetDto[] = [];
  private customerService = inject(CustomerService);
  url = 'http://localhost:5251/api/Invoice/total';

  ngOnInit(): void {
    this.getInvoice();
    this.allCustomers();
    this.getProd();
    this.getInvoceTotal();
  }
  getInvoice() {
    this.customerService.getInvoices().subscribe({
      next: (value: InvoiceGetDto[]) => {
        this.invoices = value;
        console.log('Value:', value);
      },
      error: (err) => console.log(err),
    });
  }
  showModal = false;
  selectedInvoice: any = this.invoices;

  openModal(item: any) {
    this.selectedInvoice = item;
    console.log(`selected invoice`, item.items);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  customer: Customer[] = [];
  allCustomers() {
    this.customerService.getCustomer().subscribe({
      next: (value: Customer[]) => {
        this.customer = value;
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  private productServices = inject(ProductServices);

  productsList: ProductsInterface[] = [];
  getProd() {
    this.productServices.getProducts().subscribe({
      next: (response: ProductsInterface[]) => {
        this.productsList = response;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  total :any;
  getInvoceTotal(){
    this.customerService.http.get(this.url).subscribe({
      next:(value) =>{
        this.total = value;
        console.log(this.total);
      },error(err) {
        console.log(err);
      },
    });
  }
}
