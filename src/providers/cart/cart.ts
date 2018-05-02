import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

import { SheetbaseService as SheetbaseProvider } from 'sheetbase-angular';

import { StorageProvider } from '../../providers/storage/storage';

import { HELPER } from '../../statics/helper';

@Injectable()
export class CartProvider {

  private dirtyUpdateAwaiting: number;
 
  private promoItems: any[];

  items: any;
  client: any;
  promo: any;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private sheetbase: SheetbaseProvider,

    private storage: StorageProvider
  ) {
    this.storage.object('userCart')
    .subscribe(cartData => {
      this.items = cartData.items;
      this.client = cartData.client || {};
      this.promo = cartData.promo;
    });


    this.sheetbase.get('promo')
    .subscribe(promoItems => {
      this.promoItems = promoItems;          
    });
  }


  count() {
    return Object.keys(this.items||{}).length;
  }

  subtotal() {
    let subtotal = 0;
    for(let key in (this.items||{})) {
      let cartItem = this.items[key];
      subtotal += Math.abs(cartItem.qty)*cartItem.item.price;
    }
    return subtotal;
  }

  discount() {
    let value = 0;
    if(this.promo) {
      if(this.promo.unit === '%') {
        value = this.subtotal()*this.promo.value/100;
      } else {
        value = this.promo.value;
      }
    }
    return value;
  }

  add(product: any, qty: number = 1) {
    let updates = {};
    updates['userCart/items/'+ product.$key] = {
      timestamp: (new Date()).toISOString(),
      qty: Math.abs(qty),
      item: {
        title: product.title,
        sku: product.sku,
        price: product.price,
        unit: product.unit,
        thumbnail: product.thumbnail || null
      }
    };
    
    this.storage.update(updates)
    .then(() => {
      let toast = this.toastCtrl.create({
        message: 'Product added to cart!',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      return toast.present();
    });

  }



  remove(key: string) {
    let alert = this.alertCtrl.create({
      title: 'Cart',
      message: 'Remove item from cart?'
    });

    alert.addButton({
      text: 'Remove',
      cssClass: 'danger',
      handler: () => {
        let updates = {};
        updates['userCart/items/'+ key] = null;
        
        this.storage.update(updates)
        .then(() => { return });
      }
    });
    alert.addButton('Cancel');

    return alert.present();
  }


  // dirty patch
  update(instantly: boolean = false) {
    if(instantly) {
      let updates = {};
      updates['userCart'] = {
        items: this.items,
        client: this.client,
        promo: this.promo
      };
      this.storage.update(updates).then(() => { return });
    } else {
      if(this.dirtyUpdateAwaiting) clearTimeout(this.dirtyUpdateAwaiting);
      this.dirtyUpdateAwaiting = setTimeout(() => {
        let updates = {};
        updates['userCart'] = {
          items: this.items,
          client: this.client,
          promo: this.promo
        };
        this.storage.update(updates).then(() => { return });
      }, 1500);
    }
  }


  changeQty(item: any) {
    item.qty = item.qty !== 0 ? Math.abs(item.qty): 1;
    this.items[item.$key] = HELPER.removeKeys(item, ['$key']);
    return this.update();
  }

  applyCode(code: string) {
    if(!this.promoItems || !code) return;
    let validPromoItem = null;
    (this.promoItems||[]).forEach(promoItem => {
      if(promoItem.md5 === HELPER.md5(code.toLowerCase())) validPromoItem = HELPER.removeKeys(Object.assign(promoItem, {
        code: code
      }), ['$key']);
    });

    if(validPromoItem) {
      let updates = {};
      updates['userCart/promo'] = validPromoItem;
      this.storage.update(updates).then(() => { return });

      let toast = this.toastCtrl.create({
        message: 'Promotion code applied!',
        duration: 2000,
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      return toast.present();
    }

    let alert = this.alertCtrl.create({
      title: 'Cart',
      message: 'Invalid promotion code!',
      buttons: ['Ok']
    });
    return alert.present();
  }
  removeCode() {
    let updates = {};
    updates['userCart/promo'] = null;
    this.storage.update(updates).then(() => { return });
  }


  orderReady(): boolean {
    let status = false;
    if(
      this.count() > 0 &&
      this.client.email && this.client.tel && this.client.address
    ) status = true;
    return status;
  }

}
