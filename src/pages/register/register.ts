import { Component, inject } from '@angular/core';
import { User } from '../../Interfaces/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/UserService/user-service';
import { Roles } from '../../Enum/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  Roles = Roles;
  // headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  userService = inject(UserService);
  user: User = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Role: undefined,
  };
  constructor(private router: Router) {}

  addUser() {
    this.userService.saveUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        console.log('User added');
        this.router.navigateByUrl('/layout/dashboard');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // optional cleanup
      },
    });
  }
}
