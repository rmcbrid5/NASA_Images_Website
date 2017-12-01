import { Component, OnInit } from '@angular/core';
import { MycollectionsService } from '../mycollections.service'

@Component({
  selector: 'app-mycollections',
  templateUrl: './mycollections.component.html',
  styleUrls: ['./mycollections.component.css']
})
export class MycollectionsComponent implements OnInit {
  collections;
  privSetting;
  nameCollect;
  descripCollect;
  userid;
  constructor(private myCollectService:MycollectionsService) { 
    this.collections = this.myCollectService.getData(this.onResponse.bind(this));
  }
  onResponse(res:string){
    this.collections = res;
    console.log(res);
    return false;
  }
  ngOnInit() {
  }
  newCollection(){
    this.privSetting=true;
    if(document.getElementById('priv')['checked']==true){
      this.privSetting=false;
    };
    this.nameCollect=document.getElementById('name')['value'];
    this.descripCollect=document.getElementById('description')['value'];
    this.userid = localStorage.getItem('currentUserID');
    console.log(this.nameCollect + " " + this.descripCollect + " " + this.privSetting + " " + this.userid);
    this.myCollectService.postData(this.onResponse.bind(this), this.nameCollect, this.descripCollect, this.privSetting, this.userid);
    return false;
  }
  
}
