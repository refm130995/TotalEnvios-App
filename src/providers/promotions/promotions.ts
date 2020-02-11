import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PromotionsProvider {
  apiURL = 'http://localhost:3000/';
 
  constructor(public http: HttpClient) { }
 
  getImages() {
    return this.http.get('https://sleepy-bastion-56260.herokuapp.com' + 'images').map(res => res);
  }
 
  deleteImage(img) {
    return this.http.delete('https://sleepy-bastion-56260.herokuapp.com' + 'file/all' + img._id);
  }
}