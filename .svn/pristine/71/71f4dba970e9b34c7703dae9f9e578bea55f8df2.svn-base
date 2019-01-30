import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { AuthProviders, AuthMethods, AngularFire, AngularFireAuth } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  firebaseAuth: AngularFireAuth;
  private email:string;

  constructor(public nav: NavController, private af : AngularFire) {
    this.firebaseAuth = af.auth;
  }
  
  send(){
    firebase.auth().sendPasswordResetEmail(this.email);
  }
  
}
