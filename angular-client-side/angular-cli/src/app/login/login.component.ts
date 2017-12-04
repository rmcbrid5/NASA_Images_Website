import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  onLogin(){
    this.email = document.getElementById('email')['value'];
    this.password = document.getElementById('password')['value'];
    this.loginservice.getData(this.onResponse.bind(this), this.email, this.password);
    return false;
  }
  goRegister(){
    this.router.navigate(['register']);
  }
  ngOnInit() {
  }
  onResponse(res) {
    this.response = res;
    if(res = "in"){
      this.router.navigate(['mycollections']);
    }
    return false;
  }
  
}
