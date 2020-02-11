import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingPage } from './tracking';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingPage),
    ComponentsModule  
  ],
})
export class TrackingPageModule {}
