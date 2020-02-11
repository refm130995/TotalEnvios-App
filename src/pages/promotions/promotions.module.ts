import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotionsPage } from './promotions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PromotionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionsPage),
    ComponentsModule
  ],
})
export class PromotionsPageModule {}
