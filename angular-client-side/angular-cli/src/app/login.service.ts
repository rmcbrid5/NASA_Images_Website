import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http:HttpClient) { }
    getAdmin(callback_fun, ID){
      let admin='';
      this.http.get('/api/users/'+ID).subscribe(data=>{
        alert(data.admin);
        if(data.admin==true){
          admin="admin";
        }
        callback_fun(admin);
      })
    }
    getData(callback_fun, email, password) {
      var log = "out";
      var valid = "yes";
      this.http.get('/api/users').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].email==email && data[i].password==password){
            alert("Logged In!");
            localStorage.setItem('currentUsername', data[i].firstName);
            localStorage.setItem('currentUserID', data[i]._id);
            localStorage.setItem('loggedIn', 'true');
            console.log(localStorage.getItem('loggedIn'));
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
      let valid='';
      this.http.get('/api/users').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].email==e){
            valid = "no";
          }
        }
        callback_fun(valid);
        if(valid=="no"){
          alert("Invalid Email");
          return;
        }
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
      })
      
    }
}
