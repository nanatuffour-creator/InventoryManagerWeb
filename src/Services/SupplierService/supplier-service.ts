import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../Interfaces/suppliers';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  url = 'http://localhost:5251/api/Supplier/all';
  http = inject(HttpClient);
  url1 = 'http://localhost:5251/api/Supplier/delete/';
  url2 = 'http://localhost:5251/api/Supplier/add';
  url3 = 'http://localhost:5251/api/Supplier/edit/';
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }
}
