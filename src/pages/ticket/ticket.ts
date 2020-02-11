import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage({
  segment:'ticket/:web/:W/:H/:L/:LIB/:kg/:send/:country/:city/:billing/:fullname/:email/:secure/:price/:total/:states/:unity/:time/:billingname/:billingtax/:others/:securityTax/:flete/:seguro/:totalmonto/:totalpay',
   defaultHistory:['CalculatorPage']
})
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  data:any;
  deeplinkData:any = [];
  time: any;
  total: any;
  billing: any;
  web:boolean = false;
  url: string;
  W: any;
  H: any;
  L: any;
  LIB: any;
  kg: any;
  send: any;
  country: any;
  city: any;
  fullname: any;
  email: any;
  secure: any;
  price: any;
  states: any;
  unity: any;
  billingtax: any;
  billingname: any;
  others: any;
  securityTax: any;
  flete: any;
  seguro: any;
  totalmonto: any;
  totalpay: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private social: SocialSharing) {
   /*  this.data = this.navParams.get('data') || []; */
   this.data = this.navParams.get('data') || [];
    this.time = this.navParams.get('time') || [];
    this.total = this.navParams.get('total') || [];
    this.billing = this.navParams.get('billing') || [];
    this.converter();
  }
  redondear(numero, digito:number=2){
    let base = Math.pow(10, digito);
    let entero = Math.round(numero * base);
    return entero / base;
}

converter(){
  if (this.data.unity == 'Imperial') {
    this.data.W = (this.data.W / 12);
    this.data.H = (this.data.H / 12);
    this.data.L = (this.data.L / 12);
    this.data.kg = this.data.LIB/2.205;
  }
  if (this.data.unity == 'Metrico'){
    this.data.W = (this.data.W * 2.54);
    this.data.H = (this.data.H * 2.54);
    this.data.L = (this.data.L * 2.54);  /*   this.data.LIB = this.temp.LIB;*/
    this.data.kg = this.data.LIB/2.205; 
  }
  if(this.total <= 1 ){
    this.total = 1;
  }
  if(this.data.flete <= 1 ){
    this.data.flete = 1;
  }
}

  ionViewDidLoad() {
    this.web = this.navParams.get('web');
    if(this.web){ //En esta seccion se recibe toda la informacion que se envia por la url a la web.
      this.W = this.navParams.get('W');
      this.H = this.navParams.get('H');
      this.L = this.navParams.get('L');
      this.LIB = this.navParams.get('LIB');
      this.kg = this.navParams.get('kg');
      this.send = this.navParams.get('send');
      this.country = this.navParams.get('country');
      this.city = this.navParams.get('city');
      this.billing = this.navParams.get('billing');
      this.fullname = this.navParams.get('fullname');
      this.email = this.navParams.get('email');
      this.secure = this.navParams.get('secure');
      this.price = this.navParams.get('price');
      this.total = this.navParams.get('total');
      this.states = this.navParams.get('states');
      this.unity = this.navParams.get('unity');
      this.time = this.navParams.get('time');
      this.billingname = this.navParams.get('billingname');
      this.billingtax = this.navParams.get('billingtax');
      this.others = this.navParams.get('others');
      this.securityTax = this.navParams.get('securityTax');
      this.flete = this.navParams.get('flete');
      this.seguro = this.navParams.get('seguro');
      this.totalmonto = this.navParams.get('totalmonto');
      this.totalpay = this.navParams.get('totalpay');
    }
}
 share(){//Esta funcion se encarga de generar la url dependendiendo de las opciones tomadas por el usuario
  if (this.data.country == 'Venezuela') {
    if(this.data.secure){
      this.url = 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+
      this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+'/'+
      this.data.kg+
      '/'+this.data.send+
      '/'+this.remplaceUrl(this.data.country)+
      '/'+this.remplaceUrl(this.data.city)+
      '/'+this.remplaceUrl(this.data.billing)+
      '/'+this.remplaceUrl(this.data.fullname)+
      '/'+this.remplaceUrl(this.data.email)+
      '/'+true+
      '/'+this.data.price+
      '/'+this.total+
      '/'+this.remplaceUrl(this.data.states)+
      '/'+this.data.unity+
      '/'+this.remplaceUrl(this.time)+
      '/'+this.remplaceUrl(this.data.billingname)+
      '/'+this.data.billingtax+
      '/'+this.data.others+
      '/'+this.data.securityTax+'/'+this.data.flete+
      '/'+this.redondear(this.data.price * this.data.securityTax)+
      '/'+this.redondear(this.data.flete+(this.data.price* this.data.securityTax)+this.data.total+this.data.others)+
      '/'+this.redondear(this.data.total + this.data.flete + (this.data.price * this.data.securityTax) + this.data.others + (this.data.total * this.data.billingtax))
    }else{
      this.url = 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+
      this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+'/'+
      this.data.kg+
      '/'+this.data.send+
      '/'+this.remplaceUrl(this.data.country)+
      '/'+this.remplaceUrl(this.data.city)+
      '/'+this.remplaceUrl(this.data.billing)+
      '/'+this.remplaceUrl(this.data.fullname)+
      '/'+this.remplaceUrl(this.data.email)+
      '/'+false+
      '/'+0+
      '/'+this.total+
      '/'+this.remplaceUrl(this.data.states)+
      '/'+this.data.unity+
      '/'+this.remplaceUrl(this.time)+
      '/'+this.remplaceUrl(this.data.billingname)+
      '/'+this.data.billingtax+
      '/'+this.data.others+
      '/'+0+'/'+this.data.flete+
      '/'+0.00+
      '/'+this.redondear(this.data.total+this.data.flete+this.data.others)+
      '/'+this.redondear(this.data.total + this.data.flete + this.data.others + (this.data.total * this.data.billingtax));
    }
  }else{
    if(this.data.secure){
      this.url = 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+
      this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+
      '/'+this.data.kg+
      '/'+this.data.send+
      '/'+this.remplaceUrl(this.data.country)+
      '/'+null+
      '/'+this.remplaceUrl(this.data.billing)+
      '/'+this.remplaceUrl(this.data.fullname)+
      '/'+this.remplaceUrl(this.data.email)+
      '/'+true+
      '/'+this.data.price+
      '/'+this.total+
      '/'+null+
      '/'+this.data.unity+
      '/'+this.remplaceUrl(this.time)+
      '/'+this.remplaceUrl(this.data.billingname)+
      '/'+this.data.billingtax+
      '/'+this.data.others+
      '/'+this.data.securityTax+
      '/'+this.data.flete+
      '/'+this.redondear(this.data.price * this.data.securityTax)+
      '/'+this.redondear(this.data.flete+(this.data.price* this.data.securityTax)+this.data.total+this.data.others)+
      '/'+this.redondear(this.data.total + this.data.flete + (this.data.price * this.data.securityTax) + this.data.others + (this.data.total * this.data.billingtax));
    }else{
      this.url = 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+
      this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+
      '/'+this.data.kg+
      '/'+this.data.send+
      '/'+this.remplaceUrl(this.data.country)+
      '/'+null+
      '/'+this.remplaceUrl(this.data.billing)+
      '/'+this.remplaceUrl(this.data.fullname)+
      '/'+this.remplaceUrl(this.data.email)+
      '/'+false+
      '/'+0+
      '/'+this.total+
      '/'+null+
      '/'+this.data.unity+
      '/'+this.remplaceUrl(this.time)+
      '/'+this.remplaceUrl(this.data.billingname)+
      '/'+this.data.billingtax+
      '/'+this.data.others+
      '/'+0+
      '/'+this.data.flete+
      '/'+0.00+
      '/'+this.redondear(this.data.total+this.data.flete+this.data.others)+
      '/'+this.redondear(this.data.total + this.data.flete + this.data.others + (this.data.total * this.data.billingtax));
    }
  }
  console.log(this.url);
  this.social.share(  'TotalEnvíos App', 'Visita Total-EnvíosApp', '', this.url);
  /*  console.log(this.data, this.time)
    if (this.data.country == 'Venezuela') {
      if(this.data.secure){
        
      }else{
        this.social.share(  'TotalEnvíos App', 'Visita Total-EnvíosApp', '', 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+'/'+this.data.kg+'/'+this.data.send+'/'+this.remplaceUrl(this.data.country)+'/'+this.remplaceUrl(this.data.city)+'/'+this.remplaceUrl(this.data.billing)+'/'+this.remplaceUrl(this.data.fullname)+'/'+this.remplaceUrl(this.data.email)+'/'+false+'/'+0+'/'+this.total+'/'+this.remplaceUrl(this.data.states)+'/'+this.data.unity+'/'+this.remplaceUrl(this.time)+ '/'+this.remplaceUrl(this.data.billingname)+'/'+this.data.billingtax+'/'+this.data.others+'/'+this.data.securityTax+ this.data.flete);
      }
    } else {
      if(this.data.secure){
        this.social.share(  'TotalEnvíos App', 'Visita Total-EnvíosApp', '', 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+'/'+this.data.kg+'/'+this.data.send+'/'+this.remplaceUrl(this.data.country)+'/'+null+'/'+this.remplaceUrl(this.data.billing)+'/'+this.remplaceUrl(this.data.fullname)+'/'+this.remplaceUrl(this.data.email)+'/'+true+'/'+this.data.price+'/'+this.total+'/'+null+'/'+this.data.unity+'/'+this.remplaceUrl(this.time)+ '/'+this.remplaceUrl(this.data.billingname)+'/'+this.data.billingtax+'/'+this.data.others+'/'+this.data.securityTax+ this.data.flete);
      }else{
        this.social.share(  'TotalEnvíos App', 'Visita Total-EnvíosApp', '', 'http://jamtechcorp.com/totalenvios/ticket/#/ticket/true/'+this.data.W+'/'+this.data.H+'/'+this.data.L+'/'+this.data.LIB+'/'+this.data.kg+'/'+this.data.send+'/'+this.remplaceUrl(this.data.country)+'/'+null+'/'+this.remplaceUrl(this.data.billing)+'/'+this.remplaceUrl(this.data.fullname)+'/'+this.remplaceUrl(this.data.email)+'/'+false+'/'+0+'/'+this.total+'/'+null+'/'+this.data.unity+'/'+this.remplaceUrl(this.time)+ '/'+this.remplaceUrl(this.data.billingname)+'/'+this.data.billingtax+'/'+this.data.others+'/'+this.data.securityTax+ this.data.flete);
      }
    }    */ 
  }

  remplaceUrl(url:String){ //Elimina los espacios en blanco de la url
    console.log(url);
    let result = url.replace(/ /g, "%20");
    return result;
  }


}
