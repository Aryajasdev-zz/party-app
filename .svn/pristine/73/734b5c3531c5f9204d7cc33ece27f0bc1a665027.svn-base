import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProviders, AuthMethods, AngularFire, FirebaseAuthConfig } from 'angularfire2';
import { MyAccountPage } from '../my-account/my-account';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private email:string;
  private firstName:string;
  private lastName:string;
  private password:string;
  private rpassword:string;
  constructor(
    public nav: NavController, 
    private af: AngularFire    
  ) {}

  // go to login page
  login() {
    this.nav.push(LoginPage);
  }

  // go to home page
  register() {    
    let email = this.email;
    let password = this.password;
    let rpassword = this.rpassword;
    new Promise((resolve, reject) => {
      if (this.password != this.rpassword) {
        reject(new Error('Password does not match'));
      } else {
        resolve();
      }
    }).then(() => {
      return this.af.auth.createUser({ email, password })
    })
    .then((user) => {           
      return this.af.auth.login({ email, password }, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      });
    })
    .then((user) => {   
      console.log(user);
      let fullName = this.firstName + ' ' + this.lastName;
      let userRef = this.af.database.object('/users/' + user.auth.uid);
      userRef.set({ provider: user.provider, fullName: fullName, email: this.email, avatar: "assets/img/user/avatar-default.png"});  
      window.localStorage.setItem('userid', user.auth.uid);     
      this.nav.setRoot(MyAccountPage);
    })
    .catch((e) => {      
      console.log(e.message);      
    });
  }   
}
