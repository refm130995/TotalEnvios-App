import { Component } from '@angular/core';

/**
 * Generated class for the PromotionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsComponent {

  text: string;

  constructor() {
    console.log('Hello PromotionsComponent Component');
    this.text = 'Hello World';
  }

}
