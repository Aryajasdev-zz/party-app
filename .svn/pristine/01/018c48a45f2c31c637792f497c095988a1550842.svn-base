import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html'
})
export class OrderConfirmPage {
  public cart: any;
  public postage:any;

  constructor(public nav: NavController, public cs: CartService) {
    
  }

  onSelected(ev){
    console.log(ev);
  }
  
  buy() {    
    this.nav.setRoot(HomePage);
  }
}
