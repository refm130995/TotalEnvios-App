import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, LoadingController} from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PromotionsProvider } from '../../providers/promotions/promotions';
import { Camera } from '@ionic-native/camera';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html',
})
export class PromotionsPage {
  images: any = [{
    image: "./assets/imgs/banner1.jpg",
    title:"Envío Aéreo",
    service:"./assets/imgs/aereo.jpg"
  },
  {
    image: "./assets/imgs/banner2.jpg",
    title:"Envío Maritimo",
    service:"./assets/imgs/maritimo.jpg"
  },
  {
    image: "./assets/imgs/banner3.jpg",
    title:"Reempaque",
    service:"./assets/imgs/reempaque.jpg"
  }];
  loading: any;

  constructor(public service: DataProvider, public navCtrl: NavController, private imagesProvider: PromotionsProvider, private camera: Camera, private actionSheetCtrl: ActionSheetController, private photoViewer: PhotoViewer, public loadingCtrl: LoadingController) {
  /*   this.reloadImages(); */
  }
 
  ionViewDidEnter(){
    this.getPromotions();
  }

  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }
 
  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }
 
  openImage(myImage) {
    this.photoViewer.show(myImage);
  }
 
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar imagen',
      buttons: [
        {
          text: 'Cargar de la galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
 
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true
    };
 
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
       content: 'Por favor espere...'
     });   
    this.loading.present();
}
dimissLoading(){
  if (this.loading){
    this.loading.dismiss();
  }
}

  getPromotions(){
    this.showLoading();
    this.service.getPromo().subscribe((resp) => {
      this.images = resp;
      this.dimissLoading();
    }, 
    (err) => {
      this.dimissLoading();
   })
  }
}