import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { SheetbaseService as SheetbaseProvider } from 'sheetbase-angular';

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';
import { CartProvider } from '../../providers/cart/cart';

import { HELPER } from '../../statics/helper';

@IonicPage({
  segment: 'product/:productId'
})
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  productId: string;
  product: any;

  productQty: number = 1;

  products: any[];

  constructor(
    private params: NavParams,

    private sheetbase: SheetbaseProvider,
    
    private nav: NavProvider,
    private meta: MetaProvider,
    private cart: CartProvider
  ) {
    this.productId = this.params.get('productId');
    this.product = this.params.get('product');
  }

  ionViewDidLoad() {
    HELPER.delay(this.product).then(() => {
      this.meta.set({
        title: this.product.title
      });
    });
  }

  ngOnInit() {
    console.log('Run init!');
    
    if(this.product) this.getRelatedProducts();
    if(!this.product && this.productId) {
      this.sheetbase.get(
        'products', this.productId
      ).subscribe(product => {
        this.product = product;
        
        return this.getRelatedProducts();
      });
    }
  }


  getRelatedProducts() {
    this.sheetbase.get('products', null, {
      orderByKey: Object.keys(this.product.tags||{})[0] ? ('tags/'+ Object.keys(this.product.tags)[0]): ('categories/'+ (Object.keys(this.product.categories||{})[0] ? Object.keys(this.product.categories)[0]: 'uncategorized')),
      equalTo: '!null',

      limitToFirst: 12
    }).subscribe(products => {
      if(products.length >= 12) return this.finalizeRelatedProducts(products);

      // get recent products
      this.sheetbase.get('products', null, {
        orderByKey: 'data',
        order: 'desc',

        limitToFirst: 12
      }).subscribe(recentProducts => {
        return this.finalizeRelatedProducts((products||[]).concat(recentProducts));
      });

    });
  }

  finalizeRelatedProducts(products: any[]): void {    
    let productsR1 = [];
    let productsR2 = [];

    let productIds = {};
    (products||[]).forEach(product => {      
      if(!productIds[product.$key]) {
        productIds[product.$key] = true;
        productsR1.push(product);
      }
    });

    (productsR1||[]).forEach(product => {
      if(product.$key !== this.product.$key) productsR2.push(product);
    });
    
    this.products = productsR2.slice(0, 11);
  }


}
