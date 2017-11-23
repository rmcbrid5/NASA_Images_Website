import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    user;
    constructor(private http:HttpClient) { }
    getData(callback_fun) {
      this.http.get('/api/users').subscribe(data => {
          console.log(data);
          callback_fun(data['message']);
      });
    }
    postData(callback_fun){}
}
