import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule] // Elimina HttpClientModule de aquí
})
export class CartComponent implements OnInit {
  cart: Cart = { cartId: 0, userId: 0, createdAt: new Date(), cartItems: [] };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    const userId = 1; // Replace with actual user ID
    this.cartService.getCart(userId).subscribe((data: Cart) => {
      this.cart = data;
    });
  }

  checkout() {
    // Logic for checking out
  }
}
