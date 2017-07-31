import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../app/services/api.service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService]
})
export class LoginPage {

  loginCredentials = {username: "", password: ""}

  constructor(public navCtrl: NavController, public navParams: NavParams, private _api: ApiService) {
  }

  sendLoginCredentials(){
    this._api.get_auth_token(this.loginCredentials.username, this.loginCredentials.password)
      .subscribe(tokenData => {
        console.log(tokenData.token)
        this.navCtrl.push(TabsPage,"animate=true")
      },
      err => console.log("Login credentials incorrect!"))
  }

  createAccount(){
    this._api.create_account(this.loginCredentials.username, this.loginCredentials.password)
      .subscribe(responseData => {
        this.sendLoginCredentials();
      },
      err => console.log("Could not create account!"))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
