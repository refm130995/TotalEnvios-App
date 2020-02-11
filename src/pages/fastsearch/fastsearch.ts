import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  Nav,
  NavController,
  ModalController,
  ViewController
} from 'ionic-angular';
import {
  COMMONPRODUCTS
} from "../../constant/constant";

@IonicPage()
@Component({
  selector: 'page-fastsearch',
  templateUrl: 'fastsearch.html'
})
export class FastsearchPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ContentPage';

  searchTerm: string;
  searchItems: any;
  currentItems: any = COMMONPRODUCTS;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    if (this.searchTerm == '' || !this.searchTerm) {
      this.searchItems = this.currentItems;
    } else {
      this.searchItems = this.filterItems(this.searchTerm);
    }
    this.sorting()
  }

  filterItems(searchTerm) {
    return this.currentItems.filter(item => {
      return item.box.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.box.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || (item.box.toLowerCase() + ' ' + item.box.toLowerCase()).indexOf(searchTerm.toLowerCase()) > -1 || (item.box.toLowerCase().normalize('NFD')
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize()).indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  sorting() {
    this.searchItems.sort((a, b) => {
      if (a.box > b.box) return 1
      else if (a.box < b.box) return -1
      return 0
    })
    return this.searchItems;
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

}
