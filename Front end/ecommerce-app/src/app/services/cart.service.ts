import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Cart();
  private cartItems = new BehaviorSubject<Cart>(this.cart);

  getCart() {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product, quantity: number): void {
    this.cart.addItem(product, quantity);
    this.cartItems.next(this.cart);
  }

  updateCart(cart: Cart): void {
    this.cartItems.next(cart);
  }

  getTotalQuantity(): number {
    return this.cart.getTotalQuantity();
  }

  getTotalItems(): number {
    return this.cart.getTotalItems();
  }
}
