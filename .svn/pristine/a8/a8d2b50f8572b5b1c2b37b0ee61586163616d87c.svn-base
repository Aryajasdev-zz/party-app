import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ItemService {
  private items: any;
  private catUrl = "https://www.partysuperstores.co.uk/api/Getpagedproducts/8/";
  private itemUrl = "https://www.partysuperstores.co.uk/api/Getallproducts/8/";
  private prodUrl = "https://www.partysuperstores.co.uk/api/Getproductbyurl/";
  constructor(private http: Http) {}

  getItemsUrl(url) {
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;    
    return this.http.get(this.itemUrl + url, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getItemsbyurl(url, limit) {
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;    
    return this.http.get(this.catUrl + url + "/count="+limit, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = JSON.parse(res['_body']);
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  getItem(url) {
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;    
    return this.http.get(this.prodUrl + url, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  remove(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
