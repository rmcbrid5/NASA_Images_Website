import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http:HttpClient) { }
    getAdmin(callback_fun, ID){
      //function to determine whether or not the user is an admin
      let admin='';
      //get user from the database using the user's current ID
      this.http.get('/api/users/'+ID).subscribe(data=>{
        //if their admin setting is set to true, send that back.
        if(data.admin==true){
          admin="admin";
        }
        callback_fun(admin);
      })
    }
    getData(callback_fun, email, password) {
      //function to determine if a user is logged in
      var log = "out";
      var valid = "yes";
      //send the password and email that the user entered as the body
      let body ={
        email: email,
        password: password
      }
      //go to post the email and password, but do not save in the database
      this.http.post('/api/login', body).subscribe(data=>{
        console.log(data);
        //if the message is that the user logged in, update the localStorage items
        if(data.message="User logged in."){
          alert("Logged In!");
          localStorage.setItem('currentUsername', data.user.firstName);
          localStorage.setItem('currentUserID', data.user._id);
          localStorage.setItem('loggedIn', 'true');
          console.log(localStorage.getItem('loggedIn'));
          console.log(localStorage.getItem('currentUserID'));
          console.log(localStorage.getItem('currentUsername'));
        }
        //otherwise alert the user that they are not logged in
        else{
          alert('Invalid Login.');
        }
      })
      //OLD SYSTEM TO GET USERS - NO HASHING
      // this.http.get('/api/users').subscribe(data => {
      //   for(let i=0; i<data.length; i++){
      //     if(data[i].email==email && data[i].password==password){
      //       alert("Logged In!");
      //       localStorage.setItem('currentUsername', data[i].firstName);
      //       localStorage.setItem('currentUserID', data[i]._id);
      //       localStorage.setItem('loggedIn', 'true');
      //       console.log(localStorage.getItem('loggedIn'));
      //       log = "in";
      //     }
      //     if(data[i].email==email){
      //       valid="no";
      //     }
      //   }
      //   if(log=="out"){
      //     alert("Invalid Login");
      //   }
      //   callback_fun(log)
      // });
    }
    postData(callback_fun, fn:string, ln:string, e:string, p:string, a:Boolean){
      //function used to register a user
      let valid='';
      //send a get request to users, to check and make sure that the email entered does not already belong to a user in the database
      this.http.get('/api/users').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].email==e){
            //if they find a matching email in the database, the email trying to be registered is invalid
            valid = "no";
          }
        }
        callback_fun(valid);
        if(valid=="no"){
          //if the email is invalid, notify the user
          alert("Invalid Email");
          return;
        }
        if(valid!="no"){
          //otherwise, post the new user to the database
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
