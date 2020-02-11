import { Component } from '@angular/core';
import { AlertController, NavController, Events } from 'ionic-angular';
import { PasswordPage } from '../../pages/password/password';

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.html'
})
export class ToolbarComponent {

  text: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public event: Events) {
    console.log('Hello ToolbarComponent Component');
    this.text = 'Hello World';
  }

  currentUser(){
    return localStorage.getItem('user');
  }

  exit(){
      const prompt = this.alertCtrl.create({
        title: 'Alerta',
        message: "¿Desea cerrar sesión?",
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Cerrar sesión',
            handler: data => {
             this.event.publish('logout');
            }
          }
        ]
      });
      prompt.present();
  }


}
