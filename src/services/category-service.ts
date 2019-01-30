import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class CategoryService {
  private categories: any;
  private catUrl = "https://www.partysuperstores.co.uk/api/GetallCategories/8/";  
  constructor(private http: Http) {}

  getAllCats(url) : Observable<Categories[]> {
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;
    return this.http.get(this.catUrl + url, opts)
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

  getItem(code) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === parseInt(code)) {
        return this.categories[i];
      }
    }
    return null;
  }

  remove(item) {
    this.categories.splice(this.categories.indexOf(item), 1);
  }
}


export class Categories {
  constructor(
    public code: number,
    public name: string,
    public catimg: string,
    public url: string,
    public ismain: string,
    public icon : string = "ios-add-circle-outline",
    public showsub : boolean = false,
    public subcats: string[]
  ) { }
}
