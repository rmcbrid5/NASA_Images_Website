import { Component } from '@angular/core';
import { Routes } from '@angular/router';
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
  onLogout(){
    localStorage.setItem('currentUserID', '');
    this.userfName=localStorage.getItem('currentUserID');
    localStorage.setItem('currentUsername', '');
    this.userID = localStorage.getItem('currentUserID');
    localStorage.setItem('loggedIn', 'false');
  }
}