import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketPage } from './ticket';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TicketPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketPage),
    ComponentsModule
  ],
})
export class TicketPageModule {}
