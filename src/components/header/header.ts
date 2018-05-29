import { Component, Input, NgZone } from '@angular/core';
import { Content, PopoverController } from 'ionic-angular';

import { UserService as UserProvider } from "sheetbase-angular";

import { NavProvider } from '../../providers/nav/nav';
import { CartProvider } from '../../providers/cart/cart';

import { CartLitePage } from '../../pages/cart-lite/cart-lite';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() page: string;
  @Input('content') content: Content;

  constructor(
    private zone: NgZone,
    private popoverCtrl: PopoverController,

    private sheetbaseUser: UserProvider,

    private nav: NavProvider,
    private cart: CartProvider
  ) {
  }

  showLiteCart(e) {
    let popover = this.popoverCtrl.create(CartLitePage, {}, {
      cssClass: 'big-popover'
    });
    return popover.present({
      ev: e
    });
  }

}
