import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Api, AuthProvider, DataProvider } from '../providers/providers';
import { MyApp } from './app.component';
import { PromotionsProvider } from '../providers/promotions/promotions';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Camera,
    PhotoViewer,
    SocialSharing,
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PromotionsProvider,
    AuthProvider,
    DataProvider,
    Network
  ]
})
export class AppModule { }
