import { Component } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  constructor(public router: Router) {}
  sidebarOpen = false;

  viewDashboard(){
    this.router.navigate(['/layout/dashboard']);
  }
  viewProducts(){
    this.router.navigate(['/layout/products']);
  }
  viewCustomers(){
    this.router.navigate(['/layout/customers']);
  }
  viewSuppliers(){
    this.router.navigate(['/layout/suppliers']);
  }
  viewCategories(){
    this.router.navigate(['/layout/categories']);
  }
  viewInvoices(){
    this.router.navigate(['/layout/invoices']);
  }
  viewPurchases(){
    this.router.navigate(['/layout/purchases']);
  }
  
  viewRegister(){
    this.router.navigate(['/register']);
  }
}