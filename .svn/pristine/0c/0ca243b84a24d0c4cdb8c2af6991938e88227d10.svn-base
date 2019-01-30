import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {StoreService} from '../../services/store-service';

@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {
  private store:any;  
  @ViewChild('map') mapElement;
  map:any;

  constructor(public nav: NavController, public storeService: StoreService, public np: NavParams, public platform: Platform) {
    var storeid = np.get("storeid");
    this.store = storeService.getStore(storeid);
    platform.ready().then(() => {
      //let map = new GoogleMap('map');  
    });      
  }  

  ionViewDidLoad(){
    
  }
  
}
