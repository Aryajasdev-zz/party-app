import {Injectable} from "@angular/core";

@Injectable()
export class StoreService {
  private stores: Store[] = [];
  private store:Store;

  constructor() {
    this.store = new Store(1,"Clpaham Store",-0.167221,51.463936,"268-274 Lavender Hill, Clapham Junction, London SW11 1LJ","020 7924 3210","clapham@partysuperstores.co.uk")
    this.stores.push(this.store);
    this.store = new Store(2,"Sutton Store",-0.194345,51.364856,"43 Times Square, High Street Surrey, SM1 1LF","020 8661 7323","sutton@partysuperstores.co.uk")
    this.stores.push(this.store);
    this.store = new Store(3,"Croydon Store",-0.102052,51.375195,"Unit 31, Centrale Mall North End Croydon, CR0 1TY","020 8680 9463","croydon@partysuperstores.co.uk")
    this.stores.push(this.store);
  }  

  getStore(storeid){
     for(let store of this.stores){
      if(store.storeid === storeid){
        return store;
      }
    } 
  }

  getStores(){
    return this.stores;
  }
}

export class Store {
  constructor(
    public storeid: number,
    public name: string,
    public longitude: number,
    public latitude:number,
    public address: string,   
    public phone:string,
    public email:string
  ) { }
}