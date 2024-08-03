import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { userId: 0, username: '', password: '', email: '', createdAt: new Date() };

  constructor(private userService: UserService) { }

  register() {
    this.userService.register(this.user).subscribe(response => {
      console.log('User registered successfully', response);
    });
  }
}
