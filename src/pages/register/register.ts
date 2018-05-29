import { Component, NgZone } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService as UserProvider } from "sheetbase-angular";

import { NavProvider } from '../../providers/nav/nav';
import { MetaProvider } from '../../providers/meta/meta';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private credential: any = {
    email: null,
    password: null,
    passwordRepeat: null
  };

  private registerFormGroup: FormGroup;
  private registerDisabled: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,

    private sheetbaseUser: UserProvider,

    private nav: NavProvider,
    private meta: MetaProvider
  ) {

    this.registerFormGroup = this.formBuilder.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(7)
      ])],
      'passwordRepeat': ['', Validators.compose([
        Validators.required,
        this.passwordRepeatValidator.bind(this)
      ])]
    });

  }

  ionViewDidLoad() {
    this.meta.set({
      title: 'Create account'
    });
  }

  createAccount() {
    this.registerDisabled = true;    

    this.sheetbaseUser.createUserWithEmailAndPassword(this.credential.email, this.credential.password)
    .subscribe(_ => this.ngZone.run(() => {
      this.nav.root('profile');

      let alert = this.alertCtrl.create({
        title: 'Welcome',
        message: 'Thank you for using our service!',
        buttons: ['OK']
      });
      alert.present();

    }), error => this.ngZone.run(() => {
      this.registerDisabled = false;

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

  passwordRepeatValidator(control: FormControl): {[s: string]: boolean} {
    if(this.credential.password != this.credential.passwordRepeat) {
      return {invalidPasswordRepeat: true};
    }
  }

}
