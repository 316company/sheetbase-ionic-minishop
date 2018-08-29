import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

// import { registerLocaleData } from '@angular/common';
// import localeVi from '@angular/common/locales/vi';
// registerLocaleData(localeVi);

import { IonicStorageModule } from '@ionic/storage';

import { SheetbaseModule } from 'sheetbase-angular';
import { SHEETBASE_CONFIG } from '../configs/sheetbase.config';

import { MyApp } from './app.component';
import { CartLitePage } from '../pages/cart-lite/cart-lite';

import { PipesModule } from '../pipes/pipes.module';

import { APP_CONFIG } from '../configs/app.config';

import { NavProvider } from '../providers/nav/nav';
import { StorageProvider } from '../providers/storage/storage';
import { MetaProvider } from '../providers/meta/meta';
import { CartProvider } from '../providers/cart/cart';

@NgModule({
  declarations: [
    MyApp,
    CartLitePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      locationStrategy: 'path',
      backButtonText: '',
      mode: 'md',
      pageTransition: 'wp-transition'
    }),
    IonicStorageModule.forRoot({
      name: APP_CONFIG.uri || 'sheetbase.storage',
      driverOrder: ['indexeddb', 'localstorage']
    }),

    SheetbaseModule.forRoot(SHEETBASE_CONFIG),

    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartLitePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: APP_CONFIG.locale||'en-US'},

    {provide: APP_BASE_HREF, useValue: '/'},

    NavProvider,
    StorageProvider,
    MetaProvider,
    CartProvider
  ]
})
export class AppModule {}
