import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //declare variables that will be needed
  response = '';
  first;
  last;
  email;
  password;
  admin;
  constructor(private loginservice: LoginService, private router:Router) {
    if(localStorage.getItem('loggedIn')=='true'){
      alert('Already logged in.');
      this.router.navigate(['home']);
    }
  }
  //when user clicks login button
  onLogin(){
    //get the email and password that the user entered and send them to the loginservice, to then be checked 
    this.email = document.getElementById('email')['value'];
    this.password = document.getElementById('password')['value'];
    this.loginservice.getData(this.onResponse.bind(this), this.email, this.password);
    return false;
  }
  //when user clicks register button
  goRegister(){
    //go to the register page
    this.router.navigate(['register']);
  }
  ngOnInit() {
  }
  onResponse(res) {
    //if the user's login was successful, send them to their collections page
    this.response = res;
    if(res = "in"){
      this.router.navigate(['mycollections']);
    }
    return false;
  }
  
}
