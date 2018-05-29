import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';

import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TermsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsPage),

    ComponentsModule,

    PipesModule
  ],
})
export class TermsPageModule {}
