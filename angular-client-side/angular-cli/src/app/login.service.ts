import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    user;
    loggedIn;
    constructor(private http:HttpClient) { }
    getData(callback_fun) {
      this.http.get('/api').subscribe(data => {
          console.log(data);
          callback_fun(data['message']);
      });
  }
    postData(callback_fun){}
}
