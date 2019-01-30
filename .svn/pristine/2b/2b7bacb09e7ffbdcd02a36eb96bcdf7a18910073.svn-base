import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, ViewController,  NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from "ionic-native";
import { CartService } from '../../services/cart-service';
import {InvoicePage} from '../invoice/invoice';
declare var RealexHpp:any;

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
    public cart: any;
    public carddata:CARD;
    public pp: Paypal;
    public orderid:string;
    public total:string;
    public postage:string;
    public payType='card';
    public isCard:Boolean;
    public payid:string;
    public apikey = '45724525-D866-4F0A-8F9A-4E352AAE15C1';

    constructor(public nav: NavController, public vc: ViewController, public np : NavParams, public cartService: CartService, public http: Http){
        this.cart = this.cartService.getCart();   
        this.total = this.cart.total;
        this.postage = this.cart.postage;   
        this.orderid = this.np.get("orderid");       
        this.carddata = {cardName:'Test Card',cardNo:'4263971921001307',cardType:'',cardMM:'12',cardYY:'19',cardCVC:'123',apikey:'45724525-D866-4F0A-8F9A-4E352AAE15C1', total: this.total, orderid:this.orderid};
    }

    onSelected(ev){        
        if(ev=="card"){
            this.isCard = true;
        }else{
            this.isCard = false;
        }        
    }

    payCard(){
      this.http.get("http://localhost:8080/real/request.php?siteid=0&amount=12.00&currency=GBP&orderid="+this.orderid)
        .map(res => res.json())
        .subscribe(json => {
            RealexHpp.init("payButtonId", "http://localhost:8080/real/response.php", json);
          }
        );
     
    }

    submitForm(form) {  
        this.carddata.cardType = this.getCardType(this.carddata.cardNo);              
        let url = "https://www.partysuperstores.co.uk/api/cardpayment";        
        let body=JSON.stringify(this.carddata);   
        let headers = new Headers();
        headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
        headers.append('Content-Type', 'application/json');
        let opts = new RequestOptions();
        opts.headers = headers;
        this.http.post(url, body, opts)
        .map(res => res.json())
        .subscribe( data =>{
            if(data.resultCode==1){  
              this.nav.setRoot(InvoicePage, {orderid: this.orderid});     
            }else{
              
            }
        })  
    }
    
    payPal(){
        PayPal.init({
            "PayPalEnvironmentProduction": "AZi04hEr0IJtG9Li7Uoy9oaQ30v9w5IN72TVM69RaNZnhzHhNbfDCyTfoOkaW6KKWHxPdfrt8U5NlUvv",
            "PayPalEnvironmentSandbox": "AQHZH8oxKuRENxL2_Y026egGAj2DlpRZhGeYLDF80x1X4RQqJPftPLJoBuJToCMbXSdgDx3ntUByTCl2"
        }).then(() => {
          PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({    
        })).then(() => {
            let payment = new PayPalPayment(this.total.toString(), 'GBP', 'Party Superstores Order'+ this.orderid, 'sale');
            PayPal.renderSinglePaymentUI(payment).then((response) => {
                console.log(response);  
                if(response.response.state=="approved") {
                  this.payid = response.response.id;       
                  this.pp = {infoid : '',payid : this.payid, apikey : this.apikey, total : this.cart.total,orderid : this.orderid};
                  let url = "https://www.partysuperstores.co.uk/api/paypalpayment";
                  let body=JSON.stringify(this.pp);   
                  let headers = new Headers();
                  headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
                  headers.append('Content-Type', 'application/json');
                  let opts = new RequestOptions();
                  opts.headers = headers;
                  this.http.post(url, body, opts)
                  .map(res => res.json())
                  .subscribe( data =>{
                    if(data.resultCode==1){  
                      this.nav.setRoot(InvoicePage, {orderid: this.orderid});     
                    }else{

                    }   
                  })  
                }                            
            }, (Error) => {
                console.log(Error);
            });
        }, (Error) => {
            console.log(Error);
        });
        }, (Error) => {
            console.log(Error);
        });
    }   

    getCardType(number) {
    var re = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      dankort: /^(5019)\d+$/,
      interpayment: /^(636)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };
    if (re.electron.test(number)) {
      return 'ELECTRON';
    } else if (re.maestro.test(number)) {
      return 'MAESTRO';
    } else if (re.dankort.test(number)) {
      return 'DANKORT';
    } else if (re.interpayment.test(number)) {
      return 'INTERPAYMENT';
    } else if (re.unionpay.test(number)) {
      return 'UNIONPAY';
    } else if (re.visa.test(number)) {
      return 'VISA';
    } else if (re.mastercard.test(number)) {
      return 'MC';
    } else if (re.amex.test(number)) {
      return 'AMEX';
    } else if (re.diners.test(number)) {
      return 'DINERS';
    } else if (re.discover.test(number)) {
      return 'DISCOVER';
    } else if (re.jcb.test(number)) {
      return 'JCB';
    } else {
      return 'NA';
    }
  }
}

export class CARD {
  constructor(
    public cardName : string,
    public cardNo : string,
    public cardType : string,
    public cardMM : string,		
    public cardYY : string,		
    public cardCVC : string,	
    public apikey : string,
    public total : string,
    public orderid : string	
  ) { }
}

export class Paypal {
  constructor(
    public infoid : string,
    public payid : string,
    public apikey : string,
    public total : string,
    public orderid : string	
  ) { }
}
