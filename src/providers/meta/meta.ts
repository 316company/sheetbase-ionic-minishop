import { Injectable } from '@angular/core';



@Injectable()
export class MetaProvider {

  constructor(
  ) {    
  }

  set(meta: {
    title: string,
    favicon?: string
  }) {
    // title
    if(meta.title) {
      document.title = meta.title;
    }

    // favicon
    if(meta.favicon) {
      this.changeFavicon(meta.favicon);
    }
  }

  

  private changeFavicon(src) {
    document.head || ((<any>document.head) = document.getElementsByTagName('head')[0]);

    let link = document.createElement('link');
    let oldLink = document.getElementById('favicon');

    link.id = 'favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) document.head.removeChild(oldLink);
    document.head.appendChild(link);    
  }

}
