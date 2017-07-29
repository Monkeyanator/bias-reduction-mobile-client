import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { Article } from '../../app/models/article.model';
import { Storage } from "@ionic/storage"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})

export class HomePage {

  articles: Article[];

  constructor(public navCtrl: NavController, private _api: ApiService, private _storage: Storage) {

  }

  //let server know when user taps through into article
  registerTap(articleId: string){
    this._storage.get('auth_token')
      .then((token)=> {
        this._api.register_clickthrough(articleId, token)
          .subscribe(responseData => {
            console.log(responseData)
          })
      })
    }

  //when the view enters, load default articles
  //TODO grabbing auth token should be done at login
  ionViewDidLoad(){

    this._api.get_articles()
        .subscribe(data => this.articles = data)

    this._api.get_auth_token("sam", "sam")
      .subscribe(tokenData => {
        console.log(tokenData.token)
      })

  }

}
