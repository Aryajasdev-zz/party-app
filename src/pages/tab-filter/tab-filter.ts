import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {CategoryService} from '../../services/category-service';

@Component({
  selector: 'page-tab-filter',
  templateUrl: 'tab-filter.html'
})
export class TabFilterPage {
  public url:string;  
  public categories: any;
  public catname: string;
  public errorMessage:any;

  public filter = {
    category: []
  }

  constructor(public nav: NavController, public viewCtrl: ViewController, public navParams : NavParams, public cs : CategoryService) {
    this.url = navParams.get('url');
    this.catname = navParams.get('name'); 
    this.cs.getAllCats(this.url).subscribe(
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

  showMe = function(filterurl,catname){
    this.viewCtrl.dismiss({url: filterurl,name:catname});
  }  
}
