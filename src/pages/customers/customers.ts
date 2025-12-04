import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer-service';
import { Customer } from '../../Interfaces/customers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Customers implements OnInit {
  ngOnInit(): void {
    this.allCustomers();
  }
  customerObj: any = {
    id: 0,
    name: '',
    phone: '',
    email: '',
  };
  customerService = inject(CustomerService);
  customer: Customer[] = [];
  allCustomers() {
    // debugger;
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

  addCustomer() {
    this.customerService.http.post(this.customerService.url1, this.customerObj).subscribe({
      next: (value) => {
        console.log(value);
        alert('Customer Added.');
        this.allCustomers();
      },
      error(err) {
        alert(err);
      },
    });
  }

  editCustomer(item: any) {
    this.customerObj = item;
  }

  updateCustomer(name: string) {
    this.customerService.http.put(this.customerService.url2 + name, this.customerObj).subscribe({
      next(value) {
        console.log(value);
        alert('Customer Eddited Successfully');
      },
      error(err) {
        console.log(err);
      },
    });
  }

  deleteCustomer(id: number) {
    this.customerService.http.delete(this.customerService.url3 + id).subscribe({
      next: (value) => {
        console.log(value);
        alert('Customer Deleted Successfully');
        this.allCustomers();
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
