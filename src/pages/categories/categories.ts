import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/CategoryService/category-service';
import { Category } from '../../Interfaces/category';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Categories implements OnInit {
  categoryService = inject(CategoryService);
  category: Category[] = [];
  cat: Category = {
    categoryId: 0,
    name: '',
  };
  newcategory: FormGroup = new FormGroup({
    categoryName: new FormControl(),
  });
  ngOnInit(): void {
    this.getCat();
  }
  getCat() {
    this.categoryService.getCategory().subscribe({
      next: (response: Category[]) => {
        this.category = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addCategory() {
    const result = {
      name: this.newcategory.value.categoryName,
    };
    console.log(result);
    this.categoryService.http
      .post(this.categoryService.url1, result, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (value) => {
          alert('Category Added Successfully');
          this.getCat();
        },
        error: (err) => console.log(err),
      });
  }

  deleteCategory(name: string) {
    this.categoryService.http.delete(this.categoryService.url2 + name).subscribe({
      next: (value) => {
        alert('Category Deleted Successfully');
        this.getCat();
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
