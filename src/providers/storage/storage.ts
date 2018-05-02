import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

import { HELPER } from '../../statics/helper';

import objectPath from 'object-path';


@Injectable()
export class StorageProvider {

  constructor(
    private events: Events,
    private storage: Storage
  ) {

  }

  object(path: string, oneTime: boolean = false): Observable<any> { return new Observable(observer => {

    let paths = (path.split('/')).filter(x => {return x!==''}); // filter empty value
    let storageKey = paths.splice(0, 1)[0];
    // console.log('[appStorage] get ', storageKey, paths);

    // get from storage
    this.storage.get(storageKey).then(masterData => {
      let data = this.prepareData(masterData, storageKey, paths);
      // console.log(data);
      observer.next(data);
      if(oneTime) {
        observer.complete();
      }
    }, error => {
      return Observable.throw(error);
    });

    if(!oneTime) {
      // listen for change
      this.events.subscribe('appStorage:'+ storageKey, masterData => {
        let data = this.prepareData(masterData, storageKey, paths);
        // console.log('[appStorage] data change at '+ storageKey, data);
        observer.next(data);
      });
    }

  })}

  list(path: string, oneTime: boolean = false): Observable<any> { return new Observable(observer => {

    let paths = (path.split('/')).filter(x => {return x!==''}); // filter empty value
    let storageKey = paths.splice(0, 1)[0];
    // console.log('[appStorage] get ', storageKey, paths);

    this.storage.get(storageKey).then(masterData => {
      let data = this.prepareData(masterData, storageKey, paths);
      // console.log(data);
      delete data.$key;
      observer.next(HELPER.o2a(data || {}, true));
      if(oneTime) {
        observer.complete();
      }
    }, error => {
      return Observable.throw(error);
    });


    if(!oneTime) {
      // listen for change
      this.events.subscribe('appStorage:'+ storageKey, masterData => {
        delete masterData.$key;
        observer.next(HELPER.o2a(masterData || {}, true));
      });
    }

  })}

  update(updates: any): Promise<any> { return new Promise((resolve, reject) => {
      
    let groups = {};
    let results = {};
    let resultErrors = {};

    for(let key in updates) {
      let paths = key.split('/');
      paths = paths.filter(x => {return x!==''}); // filter empty value
      let groupKey = paths.splice(0, 1)[0];

      if(paths.length < 1) {
        groups[groupKey] = updates[key];
      } else {        
        if(!groups[groupKey]) groups[groupKey] = {};
        groups[groupKey][paths.join('.')] = updates[key];
      }
    }

    for(let key in groups) {
      this.storage.get(key).then(masterData => {
        let data = Object.assign({}, masterData || {});
        for(let k in groups[key]) {
          try {
            objectPath.set(data, k, groups[key][k]);
          } catch(error) {}
        }
        
        data = HELPER.removeEmpty(data);
        delete data.$key;
        
        // this.storage.set(key, data);
        this.storage.set(key, data).then(_ => {
          results[key] = data;
        }, error => {
          resultErrors['set::'+ key] = error;
        });
        
        // notify data change
        // console.log('[appStorage] notify data change at '+ key, data);
        this.events.publish('appStorage:'+ key, data);
      }, error => {
        resultErrors['get::'+ key] = error;
      });
    }
    
    let resolveInterval = setInterval(() => {
      if(Object.keys(results).length === Object.keys(groups).length) resolve(results);
    }, 0);
    setTimeout(() => {
      clearInterval(resolveInterval); reject(resultErrors);
    }, 3000);
  })}



  /*
  *
  */
  prepareData(masterData: any, storageKey: string, paths: any): any {
    let data = {};
    try {
      data = Object.assign({}, objectPath.get(masterData, paths) || {});
    } catch(error) {}    

    if(typeof data === 'object') {
      data['$key'] = paths[paths.length-1] || storageKey;
    } else {
      data = {
        $key: paths[paths.length-1] || storageKey,
        value: data
      };
    }

    return data;
  }



}
