import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!: Cart;
  isCheckout = false;
  currentUser!: User | null;

  constructor(private cartService: CartService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.currentUser = user;
    });
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

  confirmCheckout() {
    if (confirm('¿Está seguro de que desea comprar estos productos?')) {
      this.checkout();
    }
  }

  checkout() {
    if (this.currentUser) {
      this.cartService.saveCart(this.currentUser.userId).subscribe(cart => {
        const totalAmount = this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        this.cartService.saveInvoice(cart.cartId, totalAmount).subscribe(invoice => {
          this.isCheckout = true;
        });
      });
    } else {
      alert('Debe iniciar sesión para proceder con la compra.');
    }
  }

  continueShopping() {
    this.router.navigate(['/categories']);
  }
}
