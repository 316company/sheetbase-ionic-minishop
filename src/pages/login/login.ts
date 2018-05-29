import { Component, NgZone } from '@angular/core';
import { IonicPage, AlertController, ToastController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService as UserProvider } from "sheetbase-angular";

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  forward: {
    to: string,
    data?: any
  };

  statusChecked: boolean = false;

  credential: any = {
    email: null,
    password: null
  };

  loginFormGroup: FormGroup;
  loginDisabled: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private params: NavParams,

    private sheetbaseUser: UserProvider,

    private nav: NavProvider,
    private meta: MetaProvider
  ) {

    this.statusChecked = this.params.get('bypassChecker') || false;
    this.forward = this.params.get('forward');

    // login form
    this.loginFormGroup = this.formBuilder.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(7)
      ])]
    });

  }

  ionViewDidLoad() {
    this.meta.set({
      title: 'Login'
    });
  }

  ngAfterViewInit() {
    // auth check
    if(!this.statusChecked) {
      let statusInterval = setInterval(() => {
        if(this.sheetbaseUser.getUser()) {
          clearInterval(statusInterval);
          this.nav.go('profile');
        }
      }, 1000);
      setTimeout(() => {
        this.statusChecked = true;
      }, 3000);
      setTimeout(() => {
        clearInterval(statusInterval);
      }, 5000);
    }
  }


  signIn(): void {
    this.loginDisabled = true;

    this.sheetbaseUser.signInWithEmailAndPassword(this.credential.email, this.credential.password)
      .subscribe(user => this.ngZone.run(() => {
        if(this.forward) {
          return this.nav.go(this.forward.to, this.forward.data);
        } else {
          return this.nav.go('home');
        }
      }), error => this.ngZone.run(() => {
        this.loginDisabled = false;

        let alert = this.alertCtrl.create({
          title: 'Oops!',
          message: `
            There were errors:
            <ul>
              <li>${error.meta ? error.meta.message: 'Unknown errors!'}</li>
            </ul>
          `,
          buttons: ['OK']
        });
        alert.present();
      }));
  }


  passwordReset() {
    let prompt = this.alertCtrl.create({
      title: 'Recovery',
      // subTitle: 'Enter your email to recover yout password.'
      subTitle: '(!) This function is disabled, please enable it in your project!'
    });

    // uncomment below to 

    // prompt.addInput({
    //   name: 'email',
    //   placeholder: 'Enter your email',
    //   value: (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(this.credential.email) ? this.credential.email: ''
    // });

    // prompt.addButton({
    //   text: 'Reset now',
    //   handler: data => {
    //     if(data.email) {
    //       let alert = this.alertCtrl.create({
    //         title: 'Email sent!',
    //         message: 'Please check your inbox for instructions!',
    //         buttons: ['OK']
    //       });

    //       this.sheetbaseUser.sendPasswordResetEmail(data.email)
    //       .subscribe(_ => {
    //         alert.present();
    //       }, error => {
    //         alert.present();
    //       });
    //     }
    //   }
    // });
    
    prompt.addButton('Cancel');

    return prompt.present();
  }


}
