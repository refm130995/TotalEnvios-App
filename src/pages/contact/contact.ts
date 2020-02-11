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

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  data: any = [];
  cities: any = [];
  loading: any;
  state: ArrayBuffer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: DataProvider, public loadingCtrl: LoadingController) {
    this.data.country = '';
  }
  ionViewDidLoad() {
    this.getStates();
  }

  showLoading(time: number = 3000) {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      duration: time || 3000
    });
    this.loading.present();
  }

  dimissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  getCities2() {
    this.showLoading(2000);
    this.service.getCities(this.data.states).subscribe((resp) => {
        this.dimissLoading();
        this.cities = resp;
        this.data.city = resp[0].city;
        console.log(this.cities);

      },
      (err) => {
        this.dimissLoading();
      })
  }

  getCities_() {
    this.service.getCities(this.data.states).subscribe((resp) => {
      this.cities = resp;
      this.data.city = resp[0].city;
      console.log(this.cities);

    })
  }
  getStates() {
    this.service.getStates().subscribe((resp) => {
      this.state = resp;
      this.getCities_();
    })
  }

}
