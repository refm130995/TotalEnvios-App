import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthProvider {
  apiURL = 'http://localhost:3000/';
 
  constructor(public http: HttpClient, private api: Api) { }
 
  sigIn(accountInfo:any){
    let body = {
      email: accountInfo.email,
      password: accountInfo.password,
    }
    let seq = this.api.post('auth/signIn', body);
    return seq;
  }
  signUp(accountInfo:any){
    let body = {
      email: accountInfo.email,
      password: accountInfo.password,
    }
    let seq = this.api.post('auth/signUp', body);
    return seq;
  }
}