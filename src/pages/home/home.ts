import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { Article } from '../../app/models/article.model';
import { Storage } from "@ionic/storage"
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})

export class HomePage {

  articles: Article[];

  constructor(
    public navCtrl: NavController,
    private _api: ApiService,
    private _storage: Storage,
    private _browser: InAppBrowser
  ) {}

  //let server know when user taps through into article
  registerTap(articleId: string, articleLink: string){
    this._storage.get('auth_token')
      .then((token)=> {
        this._api.register_clickthrough(articleId, token)
          .subscribe(responseData => {
            console.log(responseData);
          })
      })

    const browser = this._browser.create(articleLink, '_system', 'location=yes,toolbar=yes,closebuttoncaption=done');
  }


  //when the view enters, load default articles
  //TODO grabbing auth token should be done at login
  ionViewDidLoad(){

    this._api.get_articles()
        .subscribe(data => this.articles = data)

  }

}
