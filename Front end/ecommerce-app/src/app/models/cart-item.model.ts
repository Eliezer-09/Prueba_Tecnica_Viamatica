import { Cart } from './cart.model';
import { Product } from './product.model';

export interface CartItem {
  cartItemId: number;
  cartId: number;
  cart: Cart;
  productId: number;
  product: Product;
  quantity: number;
}
