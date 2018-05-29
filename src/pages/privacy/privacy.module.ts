import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';

import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyPage),

    ComponentsModule,

    PipesModule
  ],
})
export class PrivacyPageModule {}
