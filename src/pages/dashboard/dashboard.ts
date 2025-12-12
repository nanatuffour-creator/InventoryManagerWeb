import { Component, inject, OnInit } from '@angular/core';
import { InvoiceGetDto } from '../../Interfaces/invoice';
import { CustomerService } from '../../Services/customer-service';
import { Customer } from '../../Interfaces/customers';
import { ProductsInterface } from '../../Interfaces/products';
import { ProductServices } from '../../Services/ProductServices/product-services';
import { Chart, registerables } from 'chart.js';
import { GetPurchaseDto } from '../../Interfaces/purchases';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  invoices: InvoiceGetDto[] = [];
  purchases: GetPurchaseDto[] = [];
  private customerService = inject(CustomerService);
  url = 'http://localhost:5251/api/Invoice/total';
  url1 = 'http://localhost:5251/api/Invoice/today';

  ngOnInit(): void {
    this.getInvoice();
    this.allCustomers();
    this.getProd();
    this.getPurchase();
    this.getInvoceTotal();
    this.getPercentageTotalByDate();
    this.getCustomersAddedToday();
    this.invoicesForToday();
  }
  numberData: any[] = [];
  dateData: any[] = [];
  amountData: any[] = [];
  supplierData: any[] = [];
  getInvoice() {
    this.customerService.getInvoices().subscribe({
      next: (value: InvoiceGetDto[]) => {
        this.invoices = value;
        console.log('Value:', value);
        if (this.invoices != null) {
          this.invoices.map((o) => {
            this.numberData.push(o.total);
            this.dateData.push(o.invoiceId);
          });
          this.renderChart(this.numberData, this.dateData);
          // this.renderCharts(this.numberData, this.dateData);
        }
      },
      error: (err) => console.log(err),
    });
  }
  showModal = false;
  selectedInvoice: any = this.invoices;

  renderChart(numberData: any, dateData: any) {
    const myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: numberData,
        datasets: [
          {
            label: 'Invoice Breakdown',
            data: dateData,
          },
        ],
      },
      options: {},
    });
  }

  getPurchase() {
    this.customerService.getPur().subscribe({
      next: (value : GetPurchaseDto[]) => {
        this.purchases = value;
        console.log('Value:', value);
        if (this.purchases != null) {
          this.purchases.map((o) => {
            this.amountData.push(o.date);
            this.supplierData.push(o.amount);
          });
          this.renderCharts(this.numberData, this.dateData);
        }
      },
    });
  }
  renderCharts(supplierData: any, amountData: any) {
    const myChart = new Chart('myCharts', {
      type: 'bar',
      data: {
        labels: amountData,
        datasets: [
          {
            label: 'Purchase Trend',
            data: supplierData,
          },
        ],
      },
      options: {},
    });
  }

  openModal(item: any) {
    this.selectedInvoice = item;
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
  total: any;
  getInvoceTotal() {
    this.customerService.http.get(this.url).subscribe({
      next: (value) => {
        this.total = value;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  percentage: any;
  getPercentageTotalByDate() {
    this.customerService.http.get('http://localhost:5251/api/Invoice/percentage').subscribe({
      next: (value) => {
        this.percentage = value;
      },
      error(err) {
        alert(err);
      },
    });
  }
  customersAddedToday: any;
  url2 = 'http://localhost:5251/api/Customer/today';

  getCustomersAddedToday() {
    this.customerService.http.get(this.url2).subscribe({
      next: (value) => {
        this.customersAddedToday = value;
        // console.log(value);
      },
    });
  }
  todaysinvoices: any;
  invoicesForToday() {
    this.customerService.http.get(this.url1).subscribe({
      next: (value) => {
        this.todaysinvoices = value;
        // console.log(value);
      },
    });
  }
}
