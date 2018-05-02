import { Observable } from 'rxjs';
import { Response, Headers } from '@angular/http';

import { orderBy } from 'lodash';
import md5 from 'blueimp-md5';
import encUtf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';

export const HELPER =  {

  noMark: (str = '') => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  },

  noDash: (str = '') => {
    str = str.replace(/\-|\_/g, '');
    return str;
  },

  dashToSpace: (str = '') => {
    str = str.replace(/\-|\_/g, ' ');
    return str;
  },

  o2a: (object: {[$key: string]: any}, clone: boolean = false, limit: number = null, nullReturn: boolean = false): any[] => {
    if(clone && object !== undefined) {
      object = JSON.parse(JSON.stringify(object));
    }
    let array = [];
    for(let key in object) {
      if(typeof object[key] === 'object') {
        object[key]['$key'] = key;
      } else {
        object[key] = {
          $key: key,
          value: object[key]
        };
      }
      array.push(object[key]);
    }
    if(limit) {
      array.splice(limit, array.length);
    }
    if(nullReturn && array.length < 1) {
      array = null;
    }
    return array;
  },

  sort: (value: any[], key: string = '$key', order: string = 'desc'): any[] => {
    return orderBy(value, [key], [order]);
  },

  gravatar: (str): string => {
    let hash = md5(str);
    return 'https://www.gravatar.com/avatar/'+ hash +'?d=retro&s=250';
  },

  loadExternalScript: (scriptUrl: string) => {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    });
  },

  formatDate: (date): string => {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear(); 
  
    return monthNames[monthIndex] +' '+ day +', '+ year;
  },

  delay: (condition: any, interval: number = 1000, timeout: number = 30000): Promise<any> => {
    return new Promise((resolve, reject) => {
      let delayInterval = setInterval(() => {
        if(condition) {
          clearInterval(delayInterval);
          resolve();
        }
      }, interval);
      setTimeout(() => {
        clearInterval(delayInterval);
        reject();
      }, timeout);
    });
  },

  md5: (str): string => {
    return md5(str);
  },

  
  /*
  * object
  *
  *
  */
  removeEmpty: (obj: any): any => {
    Object.keys(obj).forEach(function(key) {
      if (obj[key] && typeof obj[key] === 'object') HELPER.removeEmpty(obj[key])
      else if (obj[key] === null) delete obj[key]
    });
    return obj;
  },

  removeKeys: (obj: any, keys: string[]): any => {
    let item = Object.assign({}, obj||{});
    (keys||[]).forEach(key => {
      delete item[key];
    });
    return item;
  },


  /*
  * query params
  *
  *
  */
  getParameterByName: (name: string, url: string = null): string => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "))
      .replace(/\//gi, '')
      .replace(/\?/gi, '')
      .replace(/\&/gi, '')
      .replace(/\#/gi, '')
      .replace(/\!/gi, '')
      .replace(/\*/gi, '')
      .replace(/\$/gi, '')
      .replace(/\@/gi, '')
      .replace(/\%/gi, '')
      .replace(/\^/gi, '');
  },

  setParams: (name: string, value: string) => {
    if(!history.pushState) return;

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+ name +'='+ value;
    return window.history.pushState({path: newurl}, '', newurl);
  },


  /*
  * pipes
  *
  *
  */

  // pipe | ago
  relativeTime: (value: any): string => {
    var rightNow: any = new Date();
    var then: any = new Date(value);

    var diff = rightNow - then;

    var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
    // week = day * 7;

    if (isNaN(diff) || diff < 0) {
      return 'n/a'; // return blank string if unknown
    }

    if (diff < second * 2) {
      // within 2 seconds
      return 'now';
    }

    if (diff < minute) {
      return Math.floor(diff / second) + ' seconds ago';
    }

    if (diff < minute * 2) {
      return 'about 1 minute ago';
    }

    if (diff < hour) {
      return Math.floor(diff / minute) + ' minutes ago';
    }

    if (diff < hour * 2) {
      return 'about 1 hour ago';
    }

    if (diff < day) {
      return  Math.floor(diff / hour) + ' hours ago';
    }

    if (diff > day && diff < day * 2) {
      return 'yeaterday';
    }

    if (diff < day * 31) { // 365
      return Math.floor(diff / day) + ' days ago';
    }

    else {
      return 'months ago';
    }

  },

  search: (items: any[], keyword: string, fields: string[] = null) => {
    let find = (item, keyword) => {
      let againstString = item.title || item.name;
      (fields||[]).forEach(field => {
        if(!item[field]) return;
        if(item[field] instanceof Object) return againstString += ' // '+ (JSON.stringify(item[field])).replace(/\{/gi, '').replace(/\"\}/gi, '').replace(/\{\"/gi, '').replace(/\"\:\"/gi, ' ').replace(/\"\,\"/gi, ' ').replace(/\"/gi, ''); 
        againstString += ' // '+ item[field];
      });
      againstString = againstString.toLowerCase();
      againstString = againstString +' // '+ HELPER.dashToSpace(againstString) +' // '+ HELPER.noDash(againstString);
      return againstString.indexOf(keyword.toLowerCase()) > -1;
    }
    return keyword ? (items || []).filter(item => { return find(item, HELPER.noMark(keyword)) }) : items;
  }

}
