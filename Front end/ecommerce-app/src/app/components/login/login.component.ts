import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading = false;

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.userService.login(this.username, this.password).subscribe(response => {
      console.log('User logged in successfully', response);
      this.isLoading = false;
      this.router.navigate(['/products']);
    }, error => {
      console.error('Error logging in user', error);
      this.isLoading = false;
    });
  }
}
