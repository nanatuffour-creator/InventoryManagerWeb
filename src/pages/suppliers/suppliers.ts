import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { SupplierService } from '../../Services/SupplierService/supplier-service';
import { Supplier } from '../../Interfaces/suppliers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  imports: [FormsModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Suppliers implements OnInit {
  supplierService = inject(SupplierService);
  suppliers: Supplier[] = [];
  ngOnInit(): void {
    this.getSupplier();
  }
  supplierObj: any = {
    id: 0,
    name: '',
    phone: '',
    email: '',
  };
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
  deleteSupplier(name: string) {
    this.supplierService.http.delete(this.supplierService.url1 + name).subscribe({
      next: (value) => {
        alert('Supplier Deleted Successfully');
        this.getSupplier();
      },
      error(err) {
        console.log(err);
      },
    });
  }
  // onclick="document.getElementById('add-supplier').classList.add('hidden')"
  addSupplier() {
    this.supplierService.http.post(this.supplierService.url2, this.supplierObj).subscribe({
      next: (value) => {
        console.log(value);
        this.getSupplier();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  editSupplier(item: any) {
    this.supplierObj = item;
  }

  updateSupplier() {
    this.supplierService.http
      .put(this.supplierService.url3 + this.supplierObj.id, this.supplierObj)
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
