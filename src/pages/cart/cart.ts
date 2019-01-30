import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {CheckoutPage} from "../checkout/checkout";
import {DeliveryPage} from "../delivery/delivery";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public items: any;  
  public subtotal: number;
  public totqty:number;
  public total: number;
  public pid:number;
  public postage:number;   

  constructor(
    public nav: NavController, 
    public cartService: CartService, 
    public modalCtrl: ModalController) {   
      this.updatecartservice();
  } 

  updatecartservice(){
    this.items = this.cartService.getItems();    
    this.postage = this.cartService.getPostage();
    this.cartService.getPostageID().then(val => this.pid = val);    
    this.cartService.getTotQty().then(val => this.totqty = val);
    this.getSubtotal();   
  }

  getSubtotal(){
    var tot=0;
    var totqty=0;    
    if(this.items){ 
      for(let item of this.items){
        tot += (item.price* item.qty);     
        totqty += item.qty;        
      }      
    }   
    this.cartService.getDiscount().then(val => tot = tot - val);  
    this.subtotal = tot;
    this.total = this.subtotal + this.postage; 
  }  

  update(sign:string, itm){    
    this.cartService.updateQty(itm,sign);  
    this.updatecartservice();
  }
  
  remove(itm){
    this.cartService.removeItem(itm);    
    this.updatecartservice();
  }
  
  Checkout() {   
    this.nav.push(CheckoutPage);
  }

  applyDelivery(delivery){      
    this.cartService.setPostageID(delivery.postageid);
    this.cartService.setPostage(delivery.postage);
    this.postage = delivery.postage;        
    this.updatecartservice();
  }

  Changedelivery(){
    let modal = this.modalCtrl.create(DeliveryPage);
    modal.onDidDismiss(confirm => {
      if (confirm) {          
        this.applyDelivery(confirm);
      } 
    });
    modal.present();
  }   
}
