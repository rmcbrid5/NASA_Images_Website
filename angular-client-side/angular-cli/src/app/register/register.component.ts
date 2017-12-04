import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //declare needed variables
  first;
  last;
  email;
  password;
  admin;
  constructor(private loginservice:LoginService, private http:HttpClient) { }

  ngOnInit() {
  }
  onRegister(){
    //get all of the elements that the user entered on html page
    this.first=document.getElementById('fname')['value'];
    this.last=document.getElementById('lname')['value'];
    this.email=document.getElementById('mail')['value'];
    this.password=document.getElementById('pword')['value'];
    this.admin=false;
    //send this data to service file to be posted
    this.loginservice.postData(this.onRegisterResponse.bind(this), this.first, this.last, this.email, this.password, this.admin);
    return false;
  }
  onRegisterResponse(res){
    //if the register was not valid, notify the user
    if(res=="no"){
      alert("Invalid");
    }
    //if it was valid
    else{
      this.first=document.getElementById('fname')['value'];
      this.last=document.getElementById('lname')['value'];
      this.email=document.getElementById('mail')['value'];
      this.password=document.getElementById('pword')['value'];
      this.admin=false;
      
    }
  }
}
