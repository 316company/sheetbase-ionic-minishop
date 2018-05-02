import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { ProductsComponent } from './products/products';

import { PipesModule } from '../pipes/pipes.module';
import { QtyEditorComponent } from './qty-editor/qty-editor';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		ProductsComponent,
    QtyEditorComponent,
	],
	imports: [
		IonicModule,
	
		PipesModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		ProductsComponent,
    QtyEditorComponent,
	]
})
export class ComponentsModule {}
