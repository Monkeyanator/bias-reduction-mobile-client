import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { Article } from '../../app/models/article.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiService]
})

export class HomePage {

  articles: Article[];

  constructor(public navCtrl: NavController, private _api: ApiService) {

  this._api.get_articles()
      .subscribe(data => this.articles = data)

  }

}
