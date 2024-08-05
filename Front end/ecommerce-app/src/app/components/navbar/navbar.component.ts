import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  totalItems: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
