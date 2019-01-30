import { CatsPage } from './../cats/cats';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MainCategoryService} from '../../services/maincats.service';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  // list of categories
  public categories: any;
  public errorMessage:any;
  constructor(public nav: NavController, public categoryService: MainCategoryService) {
  this.categoryService.getAllMain().subscribe(
      categories => this.categories = categories,
      error =>  this.errorMessage = <any>error);  
  }

  toggleDetails(data) {
    if (data.isshown) {
      data.isshown = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.isshown = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  // view category
  showMe(url, name) {
    this.nav.push(CatsPage, {url: url, name: name});
  }

  // view cart
  goToCart() {
    this.nav.push(CartPage);
  }
}
