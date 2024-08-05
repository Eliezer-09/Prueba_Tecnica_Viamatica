import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:5001/api';
  private cart = new Cart();
  private cartItems = new BehaviorSubject<Cart>(this.cart);

  constructor(private http: HttpClient) { }

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

  saveCart(userId: number) {
    return this.http.post<any>(`${this.apiUrl}/Carts`, { userId, items: this.cart.items });
  }

  saveInvoice(cartId: number, totalAmount: number) {
    return this.http.post<any>(`${this.apiUrl}/Invoices`, { cartId, totalAmount });
  }
}
