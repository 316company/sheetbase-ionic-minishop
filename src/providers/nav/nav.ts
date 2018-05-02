import { Injectable } from '@angular/core';
import { App, Content, NavController, ModalController, Modal, ViewController } from 'ionic-angular';

import { PAGES } from '../../statics/pages';




@Injectable()
export class NavProvider {
  MODAL_PAGES: {[name: string]: any};

  constructor(
    public app: App,
    private modalCtrl: ModalController
  ) {
    this.MODAL_PAGES = {};
  }

  go(
    pageName: string = 'home',
    params: any = {},
    customNav: NavController = null,
    options: any = {animate: true, direction: 'forward'}
  ): any {
    return this.root(pageName, params, customNav, options);
  }

  root(
    pageName: string = 'home',
    params: any = {},
    customNav: NavController = null,
    options: any = {animate: true, direction: 'forward'}
  ): any {
    let navCtrl: any = this.app.getRootNavById('n4');
    if(customNav) navCtrl = customNav;
    let component: any = PAGES.MAIN[pageName] || PAGES.MAIN['home'];

    return navCtrl.setRoot(component, params, options);
  }
  push(
    pageName: string = 'home',
    params: any = {},
    customNav: NavController = null,
    options: any = {animate: true, direction: 'forward'}
  ): any {
    let navCtrl: any = this.app.getRootNavById('n4');
    if(customNav) navCtrl = customNav;
    let component: any = PAGES.MAIN[pageName] || PAGES.MAIN['home'];

    return navCtrl.push(component, params, options);
  }
  pop(customNav: NavController = null): any {
    let navCtrl: any = this.app.getRootNavById('n4');
    if(customNav) navCtrl = customNav;

    if(navCtrl.canGoBack()) {
      return navCtrl.pop();
    } else {
      return navCtrl.setRoot(PAGES.MAIN['home'], {}, {animate: true, direction: 'back'});
    }
  }




  up(pageName: string = 'home', params: any = {}): any {
    let profileModal: Modal = this.modalCtrl.create(this.MODAL_PAGES[pageName], params);
    return profileModal.present();
  }
  down(viewCtrl: ViewController): any {
    if(!viewCtrl) return;
    return viewCtrl.dismiss();
  }




  scroll(content: Content, offsetTop: number = 0, duration: number = 1000): any {
    return content.scrollTo(0, offsetTop || 0, duration);
  }
  url(url: string, blank: boolean = false): any {
    if(blank) return window.open(url, '_blank');
    return (window.location.href = url);
  }


}
