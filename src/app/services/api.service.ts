import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map'
import { Article } from "../models/article.model";

@Injectable()
export class ApiService{

  readonly baseEndpoint: string = "https://mysterious-earth-94939.herokuapp.com/";

  constructor(private _http: Http){}

  public get_articles(): Observable<Article[]>{
    return this._http.get(this.baseEndpoint + 'articles/')
      .map((res: Response) => res.json())
  }

}
