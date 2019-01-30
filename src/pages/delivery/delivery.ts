import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

import {DeliveryService} from '../../services/delivery-service';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html'
})
export class DeliveryPage {
  public delivery:any;
  public errorMsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public ds : DeliveryService, public viewCtrl: ViewController) {   
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();    
    ds.getAllDelivery().subscribe(
      its => this.delivery = its,
      error => this.errorMsg = error,
      () => { loading.dismiss(); });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

  ChangeMe = function(Delivery){
    this.viewCtrl.dismiss({postageid:Delivery.postageid, postage:Delivery.amt, method : Delivery.method});
  }  

   // close modal
  closeModal() {
    this.viewCtrl.dismiss(true);
  }

}
