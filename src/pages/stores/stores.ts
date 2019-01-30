import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StoreService} from '../../services/store-service';
import {StorePage} from '../store/store';

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {
  private stores:any;
  constructor(public nav: NavController, public storeService: StoreService) {
      this.stores = storeService.getStores();
  }

  showme(store){
    this.nav.push(StorePage, {storeid: store.storeid});
  }
}
