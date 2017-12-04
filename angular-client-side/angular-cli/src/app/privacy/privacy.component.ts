import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }
  //if a user wants to edit the security and privacy policy
  onEdit(){
    //get the users id and send it to the loginservice to check if they are authorized to make changes
    var userID = localStorage.getItem('currentUserID');
    this.loginService.getAdmin(this.onResponse.bind(this), userID);
  }
  onResponse(res){
    //if they are authorized, send them to the site to change their privacy policy
    if(res=="admin"){
      window.location.href='https://www.freeprivacypolicy.com/controlpanel.htm';
    }
    //otherwise alert them that they are unauthorized and send them back to the home page
    else{
      alert('Unauthorized to make changes.');
      this.router.navigate(['home']);
    }
  }
}
