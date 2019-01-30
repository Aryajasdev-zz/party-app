import { CatsPage } from './../cats/cats';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MainCategoryService} from '../../services/maincats.service';
import {CategoryPage} from "../category/category";
import {SearchPage} from "../search/search";
import {CartPage} from "../cart/cart";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // list slides for slider
  public slides = [
    {
      src: 'assets/img/slide1.jpg'
    },
    {
      src: 'assets/img/slide2.jpg'
    },
    {
      src: 'assets/img/slide3.jpg'
    }
  ];

  // list categories
  public categories: any;
  public errorMessage : any;
  // list of items
  public items: any;

  constructor(public nav: NavController, public categoryService: MainCategoryService) {
    categoryService.getAllMain().subscribe(
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
  // go to search page
  goToSearch() {
    this.nav.push(SearchPage);
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
