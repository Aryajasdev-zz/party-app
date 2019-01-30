import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {DeliveryService} from '../../services/delivery-service';

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
  public delivery:any;
  public errorMsg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public ds : DeliveryService) {
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
    console.log('ionViewDidLoad TermsPage');
  }

}
