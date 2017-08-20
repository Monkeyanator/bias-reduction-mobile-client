import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map'
import { Article } from "../models/article.model";
import { Storage } from "@ionic/storage";

@Injectable()
export class ApiService{

  //readonly baseEndpoint: string = "https://mysterious-earth-94939.herokuapp.com/";
  readonly baseEndpoint: string = "http://localhost:8000/"

  constructor(private _http: Http, private _storage: Storage){}

  public get_articles(): Observable<Article[]>{
    return this._http.get(this.baseEndpoint + 'articles/')
      .map((res: Response) => res.json())
  }

  public get_recommended_articles(recommendationType: string): Observable<Article[]>{
    let recommmendationEndpoint = this.baseEndpoint + 'recommendations/' + recommendationType;
    return this._http.get(recommmendationEndpoint)
      .map((res: Response) => res.json())
  }

  //get auth token for username password combination
  //if token given in resonse, store in local storage
  public get_auth_token(username: string, password: string) {
    let body = {username: username, password: password}
    return this._http.post(this.baseEndpoint + 'api-token-auth/', body)
      .map((res:Response) => {
        let jsonResponse = res.json()
        this._storage.set('auth_token', jsonResponse.token)
        return jsonResponse
      });
  }

  public create_account(username: string, password: string){
    let body = {username: username, password: password}
    return this._http.post(this.baseEndpoint + 'users/', body)
      .map((res: Response) => res.json())
  }

  public register_clickthrough(article_id: String, token: String){
        let body = {article: article_id}
        let headers = new Headers();
        headers.append("Authorization", "Token " + token)

        return this._http.post(this.baseEndpoint + 'clickthroughs/', body, {headers: headers})
          .map((res: Response) => res.json());
  }

}
