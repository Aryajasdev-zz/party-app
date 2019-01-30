import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ItemService} from '../../services/item-service';
import {ItemPage} from "../item/item";
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {  
  public url:any;
  public catname:any;
  public items:any;
  public errorMsg:any;
 
  constructor(
    public nav: NavController, 
    public itemService: ItemService, 
    private navParams : NavParams
    ) 
  {
    this.url = this.navParams.get("url");
    this.catname = this.navParams.get("name");   
      
    itemService.getItemsUrl(this.url).subscribe(
      data => this.items = data,
      error => this.errorMsg = error      
    ); 
  }

  // view a item
  viewItem(url) {
    this.nav.push(ItemPage, {url: url})
  }

  // view cart
  goToCart() {
    this.nav.push(CartPage);
  }  
}
