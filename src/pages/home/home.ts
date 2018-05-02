import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SheetbaseService as SheetbaseProvider } from 'sheetbase-angular';

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';

@IonicPage({
  segment: 'app'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[];

  constructor(
    private sheetbase: SheetbaseProvider,
    
    private nav: NavProvider,
    private meta: MetaProvider
  ) {

  }

  ionViewDidLoad() {
    this.meta.set({
      title: 'Mini Shop'
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
