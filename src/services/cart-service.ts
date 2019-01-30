import {Injectable} from "@angular/core";
import {Storage} from '@ionic/storage';

@Injectable()
export class CartService {   
  private items = []; 
  private billing:Billing;
  private delivery:Delivery;
  private postage:number;
  private postageid:number;  
  private totQty:number;
  private subtotal:number;
  private discode:string;
  private discount:number;
  
  ngOnDestroy(){
    this.setItems(this.items);    
  }

  constructor(private storage : Storage) {     
    //storage.ready().then(() => { 
      this.storage.get("items").then(items => this.items = JSON.parse(items));  
      this.storage.get('billing').then(billing => this.billing = JSON.parse(billing));
      this.storage.get('delivery').then(delivery => this.delivery = JSON.parse(delivery));
      this.setPostageID(3);
      this.setPostage(3.95);  
      this.setDiscount(0);   
      this.setDiscode("na");             
    //});
  }   

  addItem(prodid:number,name:string,price:number,qty:number,img:string,sizeid:number,size:string){      
    var item: ITEM = new ITEM(prodid,name,price,qty,img,sizeid,size);   
    var sitem:any;
    if(this.items) sitem = this.getItem(item);
    if(sitem){     
      this.updateQty(sitem,'+');
    }else{      
      if(!this.items) this.items = [];
      this.items.push(item);        
    }
    this.setCartItems(this.items);
  }

  setCartItems(items){    
    var tot=0;
    var totqty=0;    
    if(items){ 
      for(let item of items){
        tot += (item.price* item.qty);     
        totqty += item.qty;        
      }      
    }   
    tot = tot - this.discount;  
    this.setTotQty(totqty);    
    this.setSubtotal(tot);    
    this.setItems(this.items);   
  }

  updateQty(sitem, sign){     
    if(sitem){  
      for(let item of this.items){
        if(item.prodid===sitem.prodid){          
          if(sign==='+') item.qty++;
          else item.qty = item.qty>1?item.qty-=1:1;
        }        
      }      
    }  
    this.setCartItems(this.items);   
  }

  clearCart(){
    this.items = [];
    this.setItems(this.items);
  }

  removeItem(sitem) {       
    if(this.items){
      this.items = this.items.filter(Item=>Item.prodid!==sitem.prodid);
    }
    this.setCartItems(this.items);
  }  

  setItems(items){       
    this.storage.set('items',JSON.stringify(items)).then(items => this.items = JSON.parse(items));
  }

  getCart(){       
    var cart:CART = new CART(this.subtotal+this.postage,this.subtotal,this.postage, this.postageid,this.discount,this.discode,this.items, this.billing, this.delivery, '45724525-D866-4F0A-8F9A-4E352AAE15C1');
    return cart;
  }

  setBilling(billing){
     this.storage.set('billing',JSON.stringify(billing));
  }

  getBilling(billing){
     return this.storage.get('billing').then(billing => this.billing = JSON.parse(billing));
  }

  setDelivery(delivery){
     this.storage.set('delivery',JSON.stringify(delivery));
  }

  getDelivery(delivery){
     return this.storage.get('delivery').then(delivery => this.delivery = JSON.parse(delivery));
  }

  getItems(){    
    return this.items;
  }  
    
  getItem(sitem):ITEM  {     
    for(let item of this.items){
      if(item.prodid === sitem.prodid){
        return item;
      }
    } 
  }   

  setTotQty(totqty){    
    this.storage.set('totqty',totqty).then(totqty => this.totQty = totqty);
  }

  getTotQty(){    
    return this.storage.get('totqty').then(val => this.totQty = val);
  }

  setPostageID(id){    
    this.storage.set('postageid',id).then(postageid => this.postageid = postageid);
  }

  getPostageID(){
    return this.storage.get('postageid').then(val => this.postageid = val);
  }

  setPostage(postage){  
    this.postage = postage;
    this.storage.set('postage',postage).then(postage => this.postage = postage);
  }

  getPostage(){
    this.storage.get('postage').then(val => this.postage = val);
    return this.postage;
  }

  setSubtotal(stotal){    
    this.storage.set('subtotal',stotal).then(subtotal => this.subtotal = subtotal);
  }

  getSubtotal(){
    return this.storage.get('subtotal').then(val => this.subtotal = val);
  } 

  setDiscount(discount){    
    this.storage.set('discount',discount).then(discount => this.discount = discount);
  }

  getDiscount(){
    return this.storage.get('discount').then(val => this.discount = val);
  }

  setDiscode(discode){    
    this.storage.set('discode',discode).then(discode => this.discode = discode);
  }

  getDiscode(){
    return this.storage.get('discode').then(val => this.discode = val);           
  }
}

export class Billing {
  constructor(   
    public cardInit : string,
    public cardName : string,
    public cardHno : string,
    public cardAddress : string,	
		public cardCity : string,
		public cardCounty : string,    
    public cardPostcode : string,
    public cardEmail : String,
    public cardPhone : String
  ) { }
}

export class Delivery {
  constructor(   
    public cardInit : string,
    public cardName : string,
    public cardHno : string,
    public cardAddress : string,	
		public cardCity : string,
		public cardCounty : string,    
    public cardPostcode : string,
    public cardEmail : String,
    public cardPhone : String
  ) { }
}

export class CART {
  constructor(
    public total : number,
    public subtotal : number,
    public postage : number,
    public postageid : number,	
		public discount : number,
		public discode : string,    
    public items: Array<ITEM>,
    public billing : Billing,
    public delivery : Delivery,
    public apikey : string
  ) { }
}

export class ITEM {
  constructor(
    public prodid: number,
    public name: string,
    public price: number,
    public qty:number,
    public img: string,   
    public sizeid:number,
    public size:string
  ) { }
}

