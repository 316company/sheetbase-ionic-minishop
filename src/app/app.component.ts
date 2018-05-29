import { Component } from '@angular/core';

import { UserService as UserProvider } from "sheetbase-angular";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = 'HomePage';

  constructor(
    private sheetbaseUser: UserProvider
  ) {
    this.sheetbaseUser.onAuthStateChanged()
      .subscribe(user => {
        console.log('Auth state change: ', user);        
      });
  }

}

