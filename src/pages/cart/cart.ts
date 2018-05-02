import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SheetbaseService as SheetbaseProvider } from 'sheetbase-angular';

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  products: any[];

  constructor(
    private sheetbase: SheetbaseProvider,
    
    private nav: NavProvider,
    private meta: MetaProvider,
    private cart: CartProvider
  ) {

  }

  ionViewDidLoad() {
    this.meta.set({
      title: 'Cart'
    });
  }

  ngOnInit() {
    this.sheetbase.get(
      'products', null, {
      limitToFirst: 100,
      orderByKey: 'id',
      order: 'desc'
    }).subscribe(products => {
      this.products = products;          
    });

  }



}
