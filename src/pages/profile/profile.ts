import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController } from 'ionic-angular';

import { UserService as UserProvider } from "sheetbase-angular";

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  statusChecked: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private params: NavParams,

    private sheetbaseUser: UserProvider,

    private nav: NavProvider,
    private meta: MetaProvider
  ) {
    this.statusChecked = this.params.get('bypassChecker') || false;
  }

  ngAfterViewInit() {
    // auth check
    if(!this.statusChecked) {
      let statusInterval = setInterval(() => {
        if(this.sheetbaseUser.getUser()) {
          clearInterval(statusInterval);
          this.statusChecked = true;
        }
      }, 1000);
      setTimeout(() => {
        clearInterval(statusInterval);
        if(!this.sheetbaseUser.getUser()) {
          this.nav.go('login');
        } else {
          this.statusChecked = true;
        }
      }, 5000);
    }
  }

  logout(e) {
    let confirm = this.alertCtrl.create({
      title: 'Logout',
      message: 'Ready to logout? Please come back anytime, thank you!',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.sheetbaseUser.signOut()
            .subscribe(_ => {
              return this.nav.go('home', {}, null, {animate: true, direction: 'back'});
            }, error => {
              let alert = this.alertCtrl.create({
                title: 'Oops!',
                message: 'There were errors, please try again.'
              });
              alert.present();
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }

}
