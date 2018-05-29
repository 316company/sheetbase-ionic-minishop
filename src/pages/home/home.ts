import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { DataService as DataProvider } from 'sheetbase-angular';

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
    private sheetbaseData: DataProvider,
    
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
    this.sheetbaseData.get(
      'products', null, {
      limitToFirst: 100,
      orderByKey: 'id',
      order: 'desc'
    }).subscribe(products => {
      this.products = products;          
    });
  }


}
