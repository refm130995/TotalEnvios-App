import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ModalController
} from 'ionic-angular';
import {
  country,
  COMMONPRODUCTS
} from "../../constant/constant";
import {
  DataProvider
} from '../../providers/data/data';

@IonicPage({
  segment: 'calculator'
})
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  country: any = country;
  states: any = [];
  comon = COMMONPRODUCTS;
  data: any = [];
  type: any = [];
  unity: any;
  name: any;
  security: boolean = false;
  tarifa: any = 5;
  pv: number;
  pc: number;
  total: number;
  temp: any;
  seltabix: number;
  loading: any;
  billing: any = [];
  state: any = [];
  transport: any = [];
  tax: any = [];
  cities: any = [];
  time: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public service: DataProvider, public modalCtrl: ModalController) {
    this.data.price = 0;
    this.seltabix = navParams.get('opentab');
    this.data.country = '';
    this.data.states = '';
    this.data.others = 0;
    this.type.box = '';
    this.data.W = 0;
    this.data.H = 0;
    this.data.L = 0;
    this.type.W = 0;
    this.type.H = 0;
    this.type.L = 0;
    this.type.LIB = 0;
    this.data.email = "";
  }

  ionViewDidEnter() {
    this.type.box = '';
    this.data.W = 0;
    this.data.H = 0;
    this.data.L = 0;
    this.type.W = 0;
    this.type.H = 0;
    this.type.L = 0;
    this.type.LIB = 0;
    this.showLoading();
    this.getBilling(); //Funcion que trae los metodos de pago y su tarifa.
    this.getTransport(); //Funcion que trae los medios de transporte del envio.
    this.getTax(); //Funcion que consulta las tarifas base por pie cubico, peso volumetrico y seguro.
    this.getStates(); //Esta funcion consulta los estados de Venezuela.
    this.dimissLoading();
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

  converter() {
    if (this.unity == 'Imperial' && this.temp) {
      this.data.W = (this.temp.W / 12);
      this.data.H = (this.temp.H / 12);
      this.data.L = (this.temp.L / 12);
      this.type.W = (this.temp.W / 12);
      this.type.H = (this.temp.H / 12);
      this.type.L = (this.temp.L / 12);
      this.data.LIB = this.temp.LIB;
      this.data.kg = this.temp.LIB / 2.205;;
    }
    if (this.unity == 'Metrico' && this.temp) {
      this.data.W = (this.temp.W * 2.54);
      this.data.H = (this.temp.H * 2.54);
      this.data.L = (this.temp.L * 2.54);
      this.type.W = (this.temp.W * 2.54);
      this.type.H = (this.temp.H * 2.54);
      this.type.L = (this.temp.L * 2.54);
      this.data.LIB = this.temp.LIB;
      this.data.kg = this.temp.LIB / 2.205;
    }
  }
  search() {
    let profileModal = this.modalCtrl.create('FastsearchPage');
    profileModal.present();
    profileModal.onDidDismiss((data) => {
      if (data) {
        this.temp = data;
        this.type.box = this.temp.box;
        this.data.box = this.temp.box;
        this.type.LIB = this.temp.LIB;
        this.data.LIB = this.temp.LIB;

        this.converter();
      }
    })
  }

  search2() {
    this.data.security = this.security;
    let alert = this.alertCtrl.create();
    alert.setTitle('Paises');
    for (var i in this.country) {
      alert.addInput({
        type: 'radio',
        label: this.country[i].name,
        value: i
      });
    }
    alert.addButton({
      text: 'Listo',
      handler: data => {
        if (data) {
          this.data.country = this.country[data].name;
          /*  this.type.kg = this.type.LIB * 0,453592;
           this.name = this.type.name; */
        }
      }
    });
    alert.addButton('Cancelar');
    alert.present();
  }



  getStates() {
    this.service.getStates().subscribe((resp) => {
        /*  this.dimissLoading(); */
        this.state = resp;
        /*  this.data.states = resp[0].name; */
        this.getCities_();
      },
      (err) => {
        /*  this.dimissLoading(); */
      })
  }
  getCities_() { //Esta funcion consulta las ciudades recibiendo como parametro un estado.

    this.service.getCities(this.data.states).subscribe((resp) => {
        /*  this.dimissLoading(); */
        this.cities = resp;
        this.data.city = resp[0].city;

      },
      (err) => {
        /*  this.dimissLoading(); */
      })
  }
  getCities2() {
    this.showLoading(2000);
    this.service.getCities(this.data.states).subscribe((resp) => {
        this.dimissLoading();
        this.cities = resp;
        this.data.city = resp[0].city;

      },
      (err) => {
        this.dimissLoading();
      })
  }

  getBilling() {
    this.service.getBilling().subscribe((resp) => {
        this.billing = resp;
        this.data.billing = this.billing[0].name;
      },
      (err) => {})
  }
  getTransport() {
    this.service.getTransport().subscribe((resp) => {
        this.transport = resp;
        this.data.send = this.transport[0].name;
      },
      (err) => {})
  }
  getTax() {
    this.service.getTax().subscribe((resp) => {
        for (let i in resp) {
          if (resp[i].name == 'Tarifa') {
            this.tarifa = resp[i].tax;
          }
          if (resp[i].name == 'Secure') {
            this.tax[0] = resp[i];
          }
        }
      },
      (err) => {})
  }

  secure_() {
    if (this.security) {
      let alert = this.alertCtrl.create({
        title: 'Nota',
        subTitle: 'Agregar seguro tiene un costo adicional del ' + this.tax[0].tax * 100 + '% del valor del artículo.',
        buttons: ['Okey']
      });
      alert.present();
    }
  }

  redondear(numero, digito: number = 2) {
    let base = Math.pow(10, digito);
    let entero = Math.round(numero * base);
    return entero / base;
  }

  calculate() {
    this.pv = 0;
    this.pc = 0;
    this.total = 0;

    if (this.unity == 'Imperial') {
      this.data.W = this.type.W * 12;
      this.data.H = this.type.H * 12;
      this.data.L = this.type.L * 12;
      this.data.LIB = this.type.LIB;
      if (this.data.send == 'Aéreo') {
        this.pv = (this.type.W * this.type.H * this.type.L) / 166; //Calculo de peso volumetrico
        if (this.pv > this.type.LIB) { //Comparacion de peso volumetrico y peso en libras
          this.total = this.pv * this.tarifa;
          this.data.flete = this.total;

          if (this.security) {
            this.total = this.total + (this.data.price * this.tax[0].tax);

          }
        } else {
          this.total = this.type.LIB * this.tarifa;
          this.data.flete = this.total;

          if (this.security) {
            this.total = this.total + (this.data.price * this.tax[0].tax);

          }
        }
       

      } else {
        this.pc = (this.type.W * this.type.H * this.type.L) / 1728; //Calculo de pie cubico

        this.total = this.pc * 17;

        this.data.flete = this.total;

        if (this.security) {
          this.total = this.total + (this.data.price * this.tax[0].tax);

        }

      }
    } else {
      this.data.W = this.data.W / 2.54;
      this.data.H = this.data.H / 2.54;
      this.data.L = this.data.L / 2.54;
      this.data.LIB = this.data.kg * 2.205;


      if (this.data.send == 'Aéreo') {
        this.pv = ((this.data.W) * (this.data.H) * (this.data.L)) / 166;
        if (this.pv >= this.data.LIB) {
          this.total = this.pv * this.tarifa;
          this.data.flete = this.total;
          if (this.security) {
            this.total = this.total + (this.data.price * this.tax[0].tax);

          }

        } else {
          this.total = this.data.LIB * this.tarifa;
          this.data.flete = this.total;

          if (this.security) {
            this.total = this.total + (this.data.price * this.tax[0].tax);
          }

        }
      } else {
        this.pv = ((this.data.W) * (this.data.H) * (this.data.L)) / 1728;
       

        this.total = this.pv * 17;
        this.data.flete = this.total;
        /*      this.total = this.total+this.total*0.04; */
        /*  this.total = this.total*10; */
        if (this.security) {
          this.total = this.total + (this.data.price * this.tax[0].tax);
        }
      }
    }
    if (this.data.country == 'Colombia') {
      if (this.total < 200) {
        this.total = this.total + this.total * 0.12;
        this.data.flete = this.total;
      } else {
        this.total = this.total + this.total * 0.38;
        this.data.flete = this.total;
      }
      this.alert();
    } else {
      this.alert();
    }
  }

  alert() {
   
    this.data.price = parseFloat(this.data.price);
    this.data.others = parseFloat(this.data.others);
    if (this.security) {
      this.data.securityTax = this.tax[0].tax;
    }
    if (this.data.billing) {
      for (var i in this.billing) {
        if (this.billing[i].name == this.data.billing) {
          this.total = this.total + (this.total * this.billing[i].tax);
          this.data.billingname = this.billing[i].name;
          this.data.billingtax = this.billing[i].tax;

        }
      }
    }
    this.data.unity = this.unity;
    this.data.secure = this.security;
    this.data.total = this.total;
    if (this.data.country == 'Venezuela' && this.data.send == 'Marítimo') {
      for (var i in this.state) {
        if (this.data.states == this.state[i].name) {
          if (this.state[i].region == 'Centro') {
            this.time = '3 semanas';
          } else {
            this.time = '4 semanas';
          }
        }
      }
    }
    if (this.data.country == 'Venezuela' && this.data.send == 'Aéreo') {
      for (var i in this.state) {
        if (this.data.states == this.state[i].name) {
          if (this.state[i].region == 'Centro') {
            this.time = '5 días';
          } else {
            this.time = '7 a 10 días';
          }
        }
      }
    }

    if (this.data.country != 'Venezuela' && this.data.send == 'Marítimo') {
      this.time = '3 semanas';
    }
    if (this.data.country != 'Venezuela' && this.data.send == 'Aéreo') {
      this.time = '7 a 10 días';
    }

    /* if(this.data.send == 'Marítimo'){
      this.total = this.total*100;
    } */
    this.navCtrl.push('TicketPage', {
      time: this.time,
      data: this.data,
      billing: this.billing,
      total: this.total
    })
    /*   let alert = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'El envio tendra un costo aproximado de $ ' + this.redondear(this.total),
        buttons: ['Okey']
      });
      alert.present(); */
  }

  disabledBtn() {
    if (this.unity == 'Metrico') {
      if (this.data.W > 0 && this.data.H > 0 && this.data.L > 0 && this.data.kg > 0 && this.data.country) {
        if (this.data.country == 'Venezuela' && this.data.states) {
          if (this.security) {
            if (this.data.price > 0 && this.data.fullname) {
              return false;
            } else {
              return true;
            }
          } else {
            if (this.data.fullname) {
              return false;
            } else {
              return true;
            }
          }
        } else if (!this.data.states) {
          if (this.security && !this.data.states) {
            if (this.data.price > 0 && this.data.fullname) {
              return false;
            } else {
              return true;
            }
          } else {
            if (this.data.fullname) {
              return false;
            } else {
              return true;
            }
          }
        }

      } else {
        return true;
      }
    } else {
      if (this.type.W > 0 && this.type.H > 0 && this.type.L > 0 && this.type.LIB > 0 && this.data.country) {
        if (this.data.country == 'Venezuela' && this.data.states) {
          if (this.security) {
            if (this.data.price > 0 && this.data.fullname) {
              return false;
            } else {
              return true;
            }
          } else {
            if (this.data.fullname) {
              return false;
            } else {
              return true;
            }
          }
        } else if (!this.data.states) {
          if (this.security && !this.data.states) {
            if (this.data.price > 0 && this.data.fullname) {
              return false;
            } else {
              return true;
            }
          } else {
            if (this.data.fullname) {
              return false;
            } else {
              return true;
            }
          }
        }
      } else {
        return true;
      }
    }
  }
  alertSecurity() {
    let alert = this.alertCtrl.create({
      title: 'Nota',
      subTitle: 'Recomendamos asegurar productos mayores a $500.',
      buttons: ['Okey']
    });
    alert.present();
  }
  /*   converter(){

    } */
}
