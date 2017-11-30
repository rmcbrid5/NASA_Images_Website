import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http:HttpClient) { }
    getData(callback_fun, email, password) {
      var log = "out";
      var valid = "yes";
      this.http.get('/api/users').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].email==email && data[i].password==password){
            alert("Logged In!");
            localStorage.setItem('currentUsername', data[i].firstName);
            localStorage.setItem('currentUserID', data[i]._id);
            localStorage.setItem('loggedIn', "true");
            log = "in";
          }
          if(data[i].email==email){
            valid="no";
          }
        }
        if(log=="out"){
          alert("Invalid Login");
        }
        callback_fun(valid)
      });
    }
    postData(callback_fun, fn:string, ln:string, e:string, p:string, a:Boolean){
      var valid : string;
      valid = "yes";
      this.http.get('/api/users').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].email==e){
            alert("Invalid Email");
            valid = "no";
          }
        }
        callback_fun(valid);
      });
      if(valid!="no"){
        let body = {
          firstName: fn,
          lastName: ln,
          email: e,
          password: p,
          admin: a
        };
        this.http.post('/api/users', body).subscribe();
      }
    }
}
