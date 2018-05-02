import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { NavProvider } from '../../providers/nav/nav';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  selector: 'page-cart-lite',
  templateUrl: 'cart-lite.html',
})
export class CartLitePage {

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,

    private nav: NavProvider,
    private cart: CartProvider
  ) {
  }

}
