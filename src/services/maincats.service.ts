import { UserService } from './user-service';
import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class MainCategoryService {  
  private catUrl = 'https://www.partysuperstores.co.uk/api/Getmaincategories/8';  // URL to web API
  constructor(private http: Http, private US: UserService) {}

  gettoken(){
    this.US.getToken().subscribe(
      data => this.settoken(data),
      error => localStorage.setItem("token","")
    );    
  }

  settoken(data){
    localStorage.setItem("token", data)
  }

  getAllMain() : Observable<MainCategories[]> {
    this.gettoken();    
    let headers = new Headers();
    headers.append('Authorization', "Bearer "+ localStorage.getItem("token"));
    let opts = new RequestOptions();
    opts.headers = headers;
    return this.http.get(this.catUrl, opts)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = JSON.parse(res['_body']);
    //console.log(body);
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
}

export class MainCategories {
  constructor(
    public code: number,
    public name: string,
    public imgname: string,
    public url: string,
    public icon : string = "ios-add-circle-outline",
    public showsub : boolean = false,
    public subcats: string[]
  ) { }
}
