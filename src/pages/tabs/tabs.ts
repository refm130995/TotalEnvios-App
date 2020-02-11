import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Tabs, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = 'HomePage';
  tab2Root: any = 'PromotionsPage';
  tab3Root: any = 'CalculatorPage';
  tab4Root: any = 'ContactPage';
  tab5Root: any = 'TrackingPage'

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";
  tab5Title = " ";
  index: number;
  constructor(public navCtrl: NavController, public translateService: TranslateService, private navParams: NavParams, private event: Events) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = 'Inicio';
      this.tab2Title = 'Ofertas';
      this.tab3Title = 'Calculadora';
      this.tab4Title = 'Contacto';
      this.tab5Title = 'Rastreo';
    });
    this.index = this.navParams.get('opentab');
    if(this.index == 2){
      this.tabRef.select(2);
    }

    this.event.subscribe('logout', ()=>{
      this.navCtrl.setRoot('PasswordPage'); //Funcion que hace el cierre de sesion.
      localStorage.clear();
    })
  }

  ionViewDidEnter(){
    console.log('1');
    
    if (!this.currentUser()) {
      console.log('2');
    
      this.navCtrl.setRoot('PasswordPage');
    }
  }
  currentUser(){
    return localStorage.getItem('user');
  }
}
