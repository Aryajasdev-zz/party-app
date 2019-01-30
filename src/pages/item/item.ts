import {Component} from '@angular/core';
import {NavController, ModalController, NavParams, AlertController} from 'ionic-angular';
import {ItemService} from '../../services/item-service';
import {CartService} from '../../services/cart-service';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html'  
})
export class ItemPage {
  // item info
  public item: any;
  public url : string;
  public errorMsg : any;
  public sizeid : number=0;
  public prodsizes:any;
  public qty:number=1;  

  constructor(
    public nav: NavController, 
    public itemService: ItemService, 
    public modalCtrl: ModalController, 
    private np : NavParams, 
    private cs : CartService,
    public AC: AlertController) {
    // get the first item as sample data
    this.url = this.np.get("url");
    itemService.getItem(this.url).subscribe(
      item => this.getitem(item),
      error => this.errorMsg = error);     
  }

  getitem(item){
    //console.log(item);
    this.item = item;    
    if(item.sizes.length>=1){
      this.sizeid = item.sizes[0].sizeid;
      this.prodsizes = item.sizes[0];     
    }
  }

  update = function(sign:string){
    if(sign=='+') this.qty++;
    else this.qty-=1;
  }

  onChange(ev:any){
    this.sizeid = ev.sizeid;   
  }
   // view cart
  goToCart() {
    this.nav.push(CartPage);
  }s

  addtoCart = function(item:any,sizes:any, qty:number){   
    console.log(item);
    console.log(sizes);
    this.cs.addItem(item.prodid,item.name,item.price,qty,item.img,sizes.sizeid,sizes.sizename);    
    this.showAlert(item.name);
  }  

  showAlert(name) {
    let alert = this.AC.create({
      title: 'Add to Cart',
      subTitle: name + ' added to the cart',
      buttons: ['OK']
    });
    alert.present();
  }
}
