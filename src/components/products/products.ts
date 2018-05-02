import { Component, Input } from '@angular/core';

import { NavProvider } from '../../providers/nav/nav';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  selector: 'app-products',
  templateUrl: 'products.html'
})
export class ProductsComponent {

  @Input('products') products: any[];
  @Input('keyword') keyword: string;
  
  constructor(
    private nav: NavProvider,
    private cart: CartProvider
  ) {
    
  }

}
