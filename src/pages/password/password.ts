import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, MenuController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  userData: any;
  loginactive: any = 0;
  firt: any = false;
  requeridemail: any = {};
  email: any = {};
  minLength: any;
  myForm: FormGroup;
  loading: any;
  pass: boolean = false;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public menu: MenuController, private loadingCtrl: LoadingController, public service: AuthProvider, public formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      email: ["", [Validators.compose([Validators.required]), Validators.email]],
      password: ["", [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]],
    });
  }
  homePage(){
      this.navCtrl.setRoot('TabsPage',  {opentab: 0});
    }

    doLogin() {
      this.showLoading();
     this.service.sigIn(this.myForm.value).subscribe((resp) => {
       this.dimissLoading();
   
       localStorage.setItem('user', JSON.stringify(this.myForm.value));
       this.navCtrl.setRoot('TabsPage');
     }, 
     (err) => {
      this.dimissLoading();
      let toast = this.toastCtrl.create({
        message: 'La contraseña o correo ingresado son invalidos  ',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    })
   }
   ionViewDidEnter() {
     // the root left menu should be disabled on the tutorial page
     this.menu.enable(false);
   }
 
   ionViewWillLeave() {
     // enable the root left menu when leaving the tutorial page
     this.menu.enable(true);
   }
   
    showLoading(){
      this.loading=this.loadingCtrl.create({
         content: 'Por favor espere...'
       });   
      this.loading.present();
 }
   dimissLoading(){
     if (this.loading){
       this.loading.dismiss();
     }
   }
   
   show(){
     this.pass = !this.pass;
   }
   goToSignIn(){
     this.navCtrl.push('RegisterPage');
   }

}
