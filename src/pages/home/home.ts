import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import {
  DataProvider
} from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  slides: any = [{
      image: "./assets/imgs/banner1.jpg",
      title: "Envío Aéreo",
      service: "./assets/imgs/aereo.jpg"
    },
    {
      image: "./assets/imgs/banner2.jpg",
      title: "Envío Maritimo",
      service: "./assets/imgs/maritimo.jpg"
    },
    {
      image: "./assets/imgs/banner3.jpg",
      title: "Reempaque",
      service: "./assets/imgs/reempaque.jpg"
    }
  ];
  option: string = "service";
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public service: DataProvider) {}

  ionViewDidEnter() {
    this.getPromotions();
  }

  goDetail() {
    this.navCtrl.push('ServicesDetailsPage');
  }
  goCalculator() {
    this.navCtrl.parent.select(2);
  }
  getPromotions() {
    this.showLoading();
    this.service.getSlider().subscribe((resp) => {
        this.slides = resp;
        this.dimissLoading();
      },
      (err) => {
        this.dimissLoading();
      })
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.loading.present();
  }
  dimissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
