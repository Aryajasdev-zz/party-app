import {Component} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {NavController} from 'ionic-angular';
import {CartService} from '../../services/cart-service';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  public cart: any;
  public orderid:string;
  public postages:any;
  public subtotal: number;
  public totqty:number;
  public total: number;
  public pid:number;
  public postage:number; 
  public billing = {cardInit:'Mr.',cardName:'Praveen Kumar',cardHno:'Flat No 17',cardAddress:'110 Benhill Road',cardCity:'Sutton',cardCounty:'Surrey',cardPostcode:'SM1 3RS',cardEmail:'aryajasdev@gmail.com',cardPhone:'07414131613', isdelAddress:'No'};
  public delivery = {cardInit:'',cardName:'',cardHno: '',cardAddress:'',cardCity:'',cardCounty:'',cardPostcode:'',cardEmail:'',cardPhone:''};

  constructor(public nav: NavController, public cartService: CartService, public http: Http) {  
    this.updatecartservice();        
    this.cart = this.cartService.getCart();      
    //this.billing = this.cart.billing;    
  }

   updatecartservice(){   
    this.postage = this.cartService.getPostage();
    this.cartService.getPostageID().then(val => this.pid = val);    
    this.cartService.getTotQty().then(val => this.totqty = val);
    this.cartService.getSubtotal().then(val => this.getTotal(val));    
    this.cart = this.cartService.getCart();   
  }
  
  getTotal(subtotal){
    this.subtotal = subtotal;
    this.total = this.subtotal + this.postage;
    //console.log(this.total);
  }

  onSelected(ev){
    if(ev=='No'){
      this.delivery = this.billing;     
    }else{      
      this.delivery = {cardInit:'',cardName:'',cardHno: '',cardAddress:'',cardCity:'',cardCounty:'',cardPostcode:'',cardEmail:'',cardPhone:''};     
    }
  }

  submitForm(form) {   
    this.cartService.setBilling(this.billing);
    this.cartService.setDelivery(this.delivery);
    this.cart = this.cartService.getCart();         
    let url = "https://www.partysuperstores.co.uk/api/Postcart";
    let body=JSON.stringify(this.cart);   
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    headers.append('Content-Type', 'application/json');
    let opts = new RequestOptions();
    opts.headers = headers;
    this.http.post(url, body, opts)
    .map(res => res.json())
    .subscribe( data =>{
      console.log(data);
      this.nav.push(PaymentPage, {orderid: data})      
    }) 
  }
}

