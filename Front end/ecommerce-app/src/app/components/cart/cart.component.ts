import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart;
  isCheckout = false;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  increaseQuantity(item: CartItem) {
    item.quantity = Math.min(10, item.quantity + 1);
    this.cartService.updateCart(this.cart);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
    this.cartService.updateCart(this.cart);
  }

  removeItem(item: CartItem) {
    this.cart.items = this.cart.items.filter(i => i !== item);
    this.cartService.updateCart(this.cart);
  }

  checkout() {
    this.isCheckout = true;
  }

  continueShopping() {
    this.router.navigate(['/categories']);
  }
}
