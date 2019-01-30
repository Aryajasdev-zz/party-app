import {Component, NgZone} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController, Events } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { AuthProviders, AuthMethods, AngularFire, FirebaseAuthConfig } from 'angularfire2';
import {RegisterPage} from "../register/register";
import {HomePage} from '../home/home';
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import { MyAccountPage } from '../my-account/my-account';
import { User } from "../../providers/user";
import { AuthenticatorService } from "../../providers/authenticator";
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public zone: NgZone;
  private email: any;
  private password: any;   
  private name:String;
  private image:String
  private authtoken:string;
  private userInfo: any;
  //FB_APP_ID: number = 440435679329458;

  constructor(
    public nav: NavController, 
    public af: AngularFire,
    private auth: AuthenticatorService,
    private events: Events,
    private alertCtrl: AlertController
    ) {
      //Facebook.browserInit(this.FB_APP_ID, "v2.8");        
  }

  doSomethingAfterUserLogin(user) {
    //console.info('Login Success Full : ', user);
    window.localStorage.setItem('userid',user.uid);
    this.nav.setRoot(MyAccountPage);    
  }

  anonymousUser() {
    this.auth.anonymousUser()
    .then((user) => {
      this.doSomethingAfterUserLogin(user);
    })
    .catch((e) => {
     let prompt = this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login ${e.message}`,
        buttons: [{ text: 'Ok' }]
      });
      prompt.present();
    });
  }

  login() {
    let email = this.email;
    let password = this.password;
    this.auth.login(email, password)
    .then((user) => {
      this.doSomethingAfterUserLogin(user);
    })
    .catch((e) => {
      let prompt = this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login ${e.message}`,
        buttons: [{ text: 'Ok' }]
      });
      prompt.present();
    });
  }

  signInWithOAuth(provider: string) {
    //INFO: Change this method to enable/disable browser mode
    // this.authenticator.signInWithOAuth(provider)
    this.auth.signInWithOAuthBrowserMode(provider)
    .then((user) => {
      this.doSomethingAfterUserLogin(user);
    })
    .catch((e) => {
      let prompt = this.alertCtrl.create({
        title: 'Error',
        message: `Failed to login ${e}`,
        buttons: [{ text: 'Ok' }]
      });
      prompt.present();
    });
  }

  resetPassword() {
    this.alertCtrl.create({
      title: 'Reset your password',
      message: "Enter your email so we can send you a link to reset your password",
      inputs: [ { type: 'email', name: 'email', placeholder: 'Email' } ],
      buttons: [
        { text: 'Cancel', handler: data => {} },
        {
          text: 'Done',
          handler: data => {
            this.auth.resetPassword(data.email)
            .then(() => {
              this.alertCtrl.create({
                title: 'Success',
                message: 'Your password has been reset - Please check your email for further instructions.',
                buttons: [{ text: 'Ok' }]
              }).present();
            })
            .catch((e) => {
              this.alertCtrl.create({
                title: 'Error',
                message: `Failed to login ${e.message}`,
                buttons: [{ text: 'Ok' }]
              }).present();
            });
          }
        }
      ]
    }).present();
  }

   // go to register page
  register() {
    this.nav.push(RegisterPage);
  }
  /*
  doFbLogin(){
    let permissions = new Array();
    let nav = this.nav;   
    let af = this.af;    
    Facebook.login(['email', 'public_profile'])
    .then(function(response){     
      let userId = response.authResponse.userID;
      let params = new Array();     
      Facebook.api("/me?fields=name,gender,email", params).then(function(user) {        
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        window.localStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.picture,
          userid : userId,
          logintype : 'facebook'
        }));        
        try
        {          
          let creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);          
          let providerConfig = {
            provider: AuthProviders.Facebook,
            method: AuthMethods.OAuthToken,
            remember: 'default',
            scope: user.email,
          };       
          af.auth.login(creds, providerConfig).then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));          
          }).catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));          
          });
        }catch(err){
          console.log(err);
        }              
        nav.setRoot(MyAccountPage);        
      }, function(err){
        console.log(err);
      });
    }, function(error){
      console.log(error);
    });
  }*/
}
