import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { File, Transfer } from 'ionic-native';
import {UserService} from '../../services/user-service';
import {ChangePasswordPage} from "../change-password/change-password";
import {LoginPage} from "../login/login";
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { AuthenticatorService } from "../../providers/authenticator";
import { User } from "../../providers/user";

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {
  user: any;
  storageDirectory: string = ''; 

  constructor(
    public nav: NavController, 
    public userService: UserService, 
    public af: AngularFire,
    private auth: AuthenticatorService
    ) { 
      let uid = window.localStorage.getItem('userid');
      this.user = new User(uid);      
  } 

  ionViewDidLoad(){
    console.log("ionViewDidLoad");
    if(!window.localStorage.getItem('userid')){
      this.nav.setRoot(LoginPage);      
    }else{
      let uid = window.localStorage.getItem('userid');
      this.user = new User(uid);    
      if(this.user){
        console.log(this.user);
      }
    }
  }  
  
  // go to changing password page
  changePassword() {
    this.nav.push(ChangePasswordPage);
  }

  logout() {
    this.af.auth.logout();
    window.localStorage.removeItem("userid");
    this.nav.setRoot(LoginPage);
  }
  /*
  doFbLogout(){
    var nav = this.nav;
    if(this.user.logintype!=='facebook'){
      this.af.auth.logout().then( function(response){        
        window.localStorage.removeItem("user");
        nav.setRoot(LoginPage);
      }, function(error){
        console.log(error);
      });      
    }else{
      Facebook.logout()
        .then(function(response) {
          window.localStorage.removeItem("user");
          nav.setRoot(LoginPage);
      }, function(error){
        console.log(error);
      });
    }
  }*/
}
