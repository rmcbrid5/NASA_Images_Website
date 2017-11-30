import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
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
  constructor(private loginservice: LoginService) {
  }
  onLogin(){
    this.email = document.getElementById('email')['value'];
    this.password = document.getElementById('password')['value'];
    this.loginservice.getData(this.onResponse.bind(this), this.email, this.password);
    return false;
  }
  onRegister(){
    this.first=document.getElementById('fname')['value'];
    this.last=document.getElementById('lname')['value'];
    this.email=document.getElementById('mail')['value'];
    this.password=document.getElementById('pword')['value'];
    this.admin=false;
    this.loginservice.postData(this.onRegisterResponse.bind(this), this.first, this.last, this.email, this.password, this.admin);
    return false;
  }
  ngOnInit() {
  }
  onResponse(res) {
    this.response = res;
    return false;
  }
  onRegisterResponse(res){
    if(res=="no"){
      alert("Invalid Password");
    }
    else{
      this.first=document.getElementById('fname')['value'];
      this.last=document.getElementById('lname')['value'];
      this.email=document.getElementById('mail')['value'];
      this.password=document.getElementById('pword')['value'];
      this.admin=false;
      
    }
  }
}
