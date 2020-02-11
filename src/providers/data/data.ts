import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class DataProvider {
  previousStatus: any;
  constructor(public http: HttpClient, private api: Api, public network: Network,
    public eventCtrl: Events) {

console.log('Hello NetworkProvider Provider');

this.previousStatus = ConnectionStatusEnum.Online;
}

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Online) {
            this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
    });
    this.network.onConnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
            this.eventCtrl.publish('network:online');
        }
        this.previousStatus = ConnectionStatusEnum.Online;
    });
}

  getStates(){
    let seq = this.api.get('country').share();
    return seq;
  }

  getCities(state:string){
    let body = {
      state: state
    }
    let seq = this.api.post('country/find', body).share();
    return seq;
  }

  getBilling(){
    let seq = this.api.get('billing').share();
    return seq;
  }

  getTransport(){
        let seq = this.api.get('transport').share();
        return seq;
      }

  getTax(){
    let seq = this.api.get('billing/tax').share();
    return seq;
  }

  getPromo(){
    let seq = this.api.get('images/promotion').share();
    return seq;
  }
  getSlider(){
    let seq = this.api.get('images/slider').share();
    return seq;
  }
  
  getCity(data:any){
            let body = {
              state: data.state
            }
            let seq = this.api.post('email/contact', body).share();
            return seq;
          }
}