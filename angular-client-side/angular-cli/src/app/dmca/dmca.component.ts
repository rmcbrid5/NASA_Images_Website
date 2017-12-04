import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DmcaComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }
  //if the user wants to edit the DMCA
  onEdit(){
    var userID = localStorage.getItem('currentUserID');
    //check to see if they are qualified to edit
    this.loginService.getAdmin(this.onResponse.bind(this), userID);
  }
  onResponse(res){
    //if they are an admin, send them to a site where they can edit
    if(res=="admin"){
      window.location.href='https://www.freeprivacypolicy.com/controlpanel.htm';
    }
    //otherwise if they are unauthorized to make changes, send them back to the home screen
    else{
      alert('Unauthorized to make changes.');
      this.router.navigate(['home']);
    }
  }
}
