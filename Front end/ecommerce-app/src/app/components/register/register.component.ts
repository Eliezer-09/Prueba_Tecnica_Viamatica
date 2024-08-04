import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', password: '', email: '', createdAt: new Date() };
  isLoading = false;

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.isLoading = true;
    this.userService.register(this.user).subscribe(response => {
      console.log('User registered successfully', response);
      this.isLoading = false; 
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error registering user', error);
      this.isLoading = false;
    });
  }
}
