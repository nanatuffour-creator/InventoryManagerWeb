import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/UserService/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userService = inject(UserService);
  user: User = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    ConfirmPassword: '',
  };
  constructor(private router: Router) {}

  verifyUser() {
    this.userService.verifyUser(this.user).subscribe({
      next: (result) => {
        console.log(result);
        alert('Login Sucessful');
        this.router.navigate(['/layout/dashboard']);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
