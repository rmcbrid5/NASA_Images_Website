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
  onEdit(){
    var userID = localStorage.getItem('currentUserID');
    this.loginService.getAdmin(this.onResponse.bind(this), userID);
  }
  onResponse(res){
    if(res=="admin"){
      window.location.href='https://www.freeprivacypolicy.com/controlpanel.htm';
    }
    else{
      alert('Unauthorized to make changes.');
      this.router.navigate(['home']);
    }
  }
}
