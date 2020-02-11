import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar';
import { IonicModule } from 'ionic-angular';
import { PromotionsComponent } from './promotions/promotions';
@NgModule({
	declarations: [ToolbarComponent,
    PromotionsComponent],
	imports: [IonicModule],
	exports: [ToolbarComponent,
    PromotionsComponent]
})
export class ComponentsModule {}
