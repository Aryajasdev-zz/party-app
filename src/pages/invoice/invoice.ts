import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/cart-service';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})
export class InvoicePage {
  public orderid:string;
  public Order:any;
  public errorMessage:string

  constructor(public nav: NavController, public np : NavParams, public cartService: CartService, public os: OrderService){
    this.orderid = this.np.get("orderid");
    this.os.getOrder(this.orderid).subscribe(
      ord => {
        this.Order = ord
        console.log(this.Order);
      },
      error =>  this.errorMessage = <any>error);  
  }
}

