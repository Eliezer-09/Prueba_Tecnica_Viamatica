import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  categoryId!: number;
  quantities: { [productId: number]: number } = {};
  addedToCart: { [productId: number]: boolean } = {};

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryId).subscribe(data => {
      this.products = data;
      this.isLoading = false;
      this.products.forEach(product => {
        this.quantities[product.productId] = 1; 
        this.addedToCart[product.productId] = false;
      });
    });
  }

  updateQuantity(productId: number, change: number) {
    if (this.quantities[productId] !== undefined) {
      this.quantities[productId] = Math.min(10, Math.max(1, this.quantities[productId] + change));
    }
  }

  addToCart(product: Product) {
    const quantity = this.quantities[product.productId];
    this.cartService.addToCart(product, quantity);
    this.addedToCart[product.productId] = true;
  }
}
