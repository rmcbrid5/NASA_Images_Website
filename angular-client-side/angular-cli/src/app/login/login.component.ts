import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response = ''
  constructor(private loginservice: LoginService) { }
  onLogin(){
    this.loginservice.getData(this.onResponse.bind(this));
  }
  onRegister(){
    this.loginservice.postData(this.onResponse.bind(this));
  }
  ngOnInit() {
  }
  onResponse(res: string) {
    this.response = res;
    console.log(this.response);
  }

}
