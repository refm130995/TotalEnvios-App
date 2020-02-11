import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { FastsearchPage } from './fastsearch';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FastsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(FastsearchPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    FastsearchPage
  ]
})
export class FastsearchModule { }
