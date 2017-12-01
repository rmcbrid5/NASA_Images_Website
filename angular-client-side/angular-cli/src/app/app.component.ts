import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  userfName = localStorage.getItem('currentUsername');
  userID = localStorage.getItem('currentUserID');
  status = localStorage.getItem('loggedIn');
  constructor(private router:Router)
  {
    this.router.navigate(['home']);
  }
  onLogout(){
    alert(this.status);
    localStorage.setItem('currentUserID', null);
    this.userfName=localStorage.getItem('currentUserID');
    localStorage.setItem('currentUsername', null);
    this.userID = localStorage.getItem('currentUserID');
    localStorage.setItem('loggedIn', 'false');
    alert("Logged Out" + localStorage.getItem('loggedIn'));
    return false;
  }
}