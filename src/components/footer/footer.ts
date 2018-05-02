import { Component, Input, NgZone } from '@angular/core';

import { NavProvider } from '../../providers/nav/nav';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  constructor(
    private zone: NgZone,

    private nav: NavProvider
  ) {   
  }

}
