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
  mostrar = false;

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.userService.login(this.username, this.password).subscribe(response => {
      console.log('Usuario logeado', response);
      this.isLoading = false;
      this.router.navigate(['/categories']);
    }, error => {
      console.error('Error al logearse', error);
      this.mostrar = true;
      this.isLoading = false;
    });
  }
}
