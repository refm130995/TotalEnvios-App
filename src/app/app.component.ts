import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Events, AlertController } from 'ionic-angular';
import { DataProvider } from '../providers/data/data';
import { Network } from '@ionic-native/network';

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = '';
  @ViewChild(Nav) nav: Nav;

  constructor(private translate: TranslateService, platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public network: Network,
    public networkProvider: DataProvider, public events: Events, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.networkProvider.initializeNetworkEvents();

      // Offline event
   this.events.subscribe('network:offline', () => {
       alert('network:offline ==> '+this.network.type);
       let alerts = this.alertCtrl.create({
        title: '¡Disculpe!',
        subTitle: 'Verifique su conexión a internet.',
        buttons: ['Okey']
      });
      alerts.present();    
   });

   // Online event
   this.events.subscribe('network:online', () => {
       alert('network:online ==> '+this.network.type);        
   });

     });
      if ( localStorage.getItem('user')) {
        this.rootPage = 'TabsPage';
      }else{
        this.rootPage = 'PasswordPage';
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
