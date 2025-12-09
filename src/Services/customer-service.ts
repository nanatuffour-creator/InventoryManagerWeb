import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../Interfaces/customers';
import { Observable } from 'rxjs';
import { Invoiced, InvoiceGetDto, InvoiceItemGetDto } from '../Interfaces/invoice';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = 'http://localhost:5251/api/Customer/all'; //Get Customers
  url1 = 'http://localhost:5251/api/Customer/add'; //Add Customer
  url2 = 'http://localhost:5251/api/Customer/edit/'; //Edit Customer
  url3 = 'http://localhost:5251/api/Customer/delete/'; //Delete Customer

  http = inject(HttpClient);

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  url4 = 'http://localhost:5251/api/Invoice/all';

  getInvoices():Observable<InvoiceGetDto[]>{
    return this.http.get<InvoiceGetDto[]>(this.url4);
  }

  getInvoiced():Observable<InvoiceItemGetDto[]>{
    return this.http.get<InvoiceItemGetDto[]>(this.url4);
  }
}
