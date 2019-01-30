import { ItemsPage } from './../items/items';
import { CategoryService } from './../../services/category-service';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-cats',
  templateUrl: 'cats.html'
})
export class CatsPage {
  public categories:any;
  public catname:any;
  public url:any;
  public errorMessage:any;
 
  constructor(
    private CS: CategoryService, 
    private nav : NavController,
    private navParams : NavParams)
  {
    this.url = this.navParams.get("url");
    this.catname = this.navParams.get("name");
    this.CS.getAllCats(this.url).subscribe(
      categories =>this.getCategories(categories),
      error =>  this.errorMessage = <any>error);  
  }  

  getCategories(data){
    //console.log(data);
    this.categories = data;
  }

  gotoPage(item){
    this.nav.push(ItemsPage, {url: item.url, name: item.name});
  }

  // view cart
  goToCart() {
    this.nav.push(CartPage);
  }
  
}
