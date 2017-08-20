import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Article } from '../../app/models/article.model';
import { Storage } from "@ionic/storage"

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ApiService]
})

export class AboutPage {

  articles: Article[];

  constructor(
    public navCtrl: NavController,
    private _api: ApiService,
    private _storage: Storage,
    private _browser: InAppBrowser
  ) {}

  //when the view enters, load recommended articles
  //TODO grabbing auth token should be done at login
  ionViewDidLoad(){

    this._api.get_recommended_articles('user-based-knn/3')
        .subscribe(data => this.articles = data)

  }

}
