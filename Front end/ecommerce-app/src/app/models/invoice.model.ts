import { Cart } from './cart.model';

export interface Invoice {
  invoiceId: number;
  cartId: number;
  cart: Cart;
  totalAmount: number;
  createdAt: Date;
}
