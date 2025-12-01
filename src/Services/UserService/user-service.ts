import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:5251/api/User/register';
  url1 = 'http://localhost:5251/api/User/login';
  constructor(private router: Router) {}
  http = inject(HttpClient);
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  verifyUser(user: User): Observable<User> {
    return this.http.post<User>(this.url1, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  changeView() {
    this.router.navigateByUrl('/register');
  }
  changeLoginView() {
    this.router.navigateByUrl('/login');
  }
}
