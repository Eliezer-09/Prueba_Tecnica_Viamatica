import { Product } from './product.model';

export interface CartItem {
  cartItemId: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
}
