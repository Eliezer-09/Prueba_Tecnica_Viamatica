import { CartItem } from './cart-item.model';

export interface Cart {
  cartId: number;
  userId: number;
  createdAt: Date;
  cartItems: CartItem[];
}
