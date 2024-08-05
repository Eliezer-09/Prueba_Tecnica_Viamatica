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
  user: Partial<User> = { username: '', password: '', email: '' };
  isLoading = false;

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.isLoading = true;
    this.userService.register(this.user as User).subscribe(response => {
      console.log('Usuario registrado correctamente', response);
      this.isLoading = false; 
      this.router.navigate(['/login']);
    }, error => {
      console.error('Error al registrar el usuario', error);
      this.isLoading = false;
    });
  }
}
