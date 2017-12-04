import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditCollectionService } from '../edit-collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  collections;
  privSetting;
  nameCollect;
  descripCollect;
  userid;
  constructor(private editCollectionService:EditCollectionService, private router:Router) {

  }

  ngOnInit() {
  }
  editCollection(){
    let collectionID = localStorage.getItem('currentCollectionID');
    this.privSetting=true;
    if(document.getElementById('newPriv')['checked']==true){
      this.privSetting=false;
    };
    this.nameCollect=document.getElementById('newName')['value'];
    this.descripCollect=document.getElementById('newDescription')['value'];
    this.userid = localStorage.getItem('currentUserID');
    this.editCollectionService.putData(this.onResponse.bind(this), this.nameCollect, this.descripCollect, this.privSetting, this.userid, collectionID);
    return false;
  }
  deleteCollection(){
    let collectionID = localStorage.getItem('currentCollectionID');
    var tf = confirm("Are you sure you want to delete this collection?");
    if(tf==true){
      this.editCollectionService.deleteData(this.onResponse.bind(this), collectionID);
    }
    else{
      this.router.navigate(['mycollections']);
    }
  }
  onResponse(res){
    
  }
}
