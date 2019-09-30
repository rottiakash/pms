import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(public afAuth: AngularFireAuth) {
    
  }
  email : any;
  password: any;
  title = 'MSDC';
  isCollapsed:any;
  user = null;
  show:any;
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).catch(error => window.alert(error));
    this.user = this.afAuth.auth.currentUser.email;
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
