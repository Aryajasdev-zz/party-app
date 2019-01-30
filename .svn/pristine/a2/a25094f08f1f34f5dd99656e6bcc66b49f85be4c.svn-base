import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, ActionSheetController, ModalController} from 'ionic-angular';
import {TabFilterPage} from "../tab-filter/tab-filter";
import {ItemService} from '../../services/item-service';
import {ItemPage} from "../item/item";
import {CartPage} from "../cart/cart";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public products: any = [];
  public items: any = [];
  public category: any;
  public viewType = 'grid';
  public sortBy = 'Alphabetical'; 
  public sortType = '+name';
  public filterName: string; 
  public url : string;
  public mainurl: string;
  public catname : string;
  public errorMsg : any;
  public limit : number = 1;
  public totitems:number=0;
  public isDone:boolean=false;   
  public subs:any;
 
  constructor(
    public nav: NavController, 
    public itemService: ItemService, 
    private navParams : NavParams, 
    public loadingCtrl: LoadingController, 
    public actionSheetCtrl: ActionSheetController, 
    public modalCtrl: ModalController) 
  {
    this.url = this.navParams.get("url");
    this.catname = this.navParams.get("name");
    this.mainurl = this.url;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();   
    itemService.getItemsUrl(this.url).subscribe(
      data => this.items = data,
      error => this.errorMsg = error,
      () => { loading.dismiss(); }
    );    
    /* 
    itemService.getItemsbyurl(this.url, this.limit).subscribe(
      its => this.fillcats(its),
      error => this.errorMsg = error,
      () => { loading.dismiss(); });
    */
  }

  /*
  ngOnInit(){       
    let timer = TimerObservable.create(2000, 1000);
    this.subs = timer.subscribe(t => this.getcats());   
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  */
  
  applyfilter = function(url){
    //this.subs.unsubscribe();    
    this.url = url;
    //this.limit=1;    
    //let timer = TimerObservable.create(2000, 2000);  
    this.itemService.getItemsUrl(url).subscribe(
      its => this.fillcats(its),
      error => this.errorMsg = error);
    //this.subs = timer.subscribe(t => this.getcats());   
  }

  // show filter modal
  openFilter(tabName) {
    // show modal
    this.products = [];
    let modal = this.modalCtrl.create(TabFilterPage, {url: this.mainurl, name: this.catname});
    modal.onDidDismiss(confirm => {
      if (confirm) {  
        this.applyfilter(confirm.url)
        this.filterName = confirm.name;
      }else{
        this.products = this.items;
      } 
    });
    modal.present();
  }
  
  getcats(){    
    this.limit+=12;    
    this.itemService.getItemsbyurl(this.url, this.limit).subscribe(
      its => this.fillcats(its),
      error => this.errorMsg = error);
  }

  fillcats(its){   
    console.log("Items : ",its.length); 
    if(its.length>0){
      for(let item of its){
        if(this.items.indexOf(item)==-1){
          this.products.push(item);        
        }      
      }    
    }else{
      this.isDone=true;    
      this.subs.unsubscribe();
    }
    this.items = this.products;    
    console.log(this.items);
  }

  onChange(ev:any){
    console.log(ev);
    this.sortBy = ev;
  }

  // switch to list view
  viewList() {
    this.viewType = 'list';      
  }
   
  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';       
  }

   getItems(ev: any) {
    let str = ev.target.value;
    this.products = this.items;
    if (str && str.trim() != '') {      
      this.products = this.products.filter((prod) => {
       return (prod.name.toLowerCase().indexOf(str.toLowerCase()) > -1 || prod.descr.toLowerCase().indexOf(str.toLowerCase()) > -1);
      })
    }
  }

  onCancel(ev: any){     
     //console.log(ev);
     this.products = this.items;           
  }  

  // view a item
  viewItem(url) {
    this.nav.push(ItemPage, {url: url})
  }

  // view cart
  goToCart() {
    this.nav.push(CartPage);
  }

  sortArray = function(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }  
 
  // choose sort by
  chooseSortBy() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Alphabetical',
          handler: () => {
            this.sortBy = 'Alphabetical';
            this.products.sort(this.sortArray("name"));           
          }
        },
        {
          text: 'Lowest Price First',
          handler: () => {
            this.sortBy = 'Lowest Price First';            
            this.products.sort(this.sortArray("shopprice"));           
          }
        },
        {
          text: 'Highest Price First',
          handler: () => {
            this.sortBy = 'Highest Price First';            
            this.products.sort(this.sortArray("-shopprice"));    
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
