import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../Interfaces/category';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:5251/api/Category/all';
  url1 = 'http://localhost:5251/api/Category/add';
  url2 = 'http://localhost:5251/api/Category/delete/';

  http = inject(HttpClient);

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  deleteCat(): Observable<Category[]>{
    return this.http.delete<Category[]>(this.url2);
  }
}
