import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditCollectionService } from '../edit-collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  //declaring variables
  collections;
  privSetting;
  nameCollect;
  descripCollect;
  userid;
  constructor(private editCollectionService:EditCollectionService, private router:Router) {

  }

  ngOnInit() {
  }
  //when user wants to edit a collection (clicks make changes button)
  editCollection(){
    //get the collection ID from localStorage
    let collectionID = localStorage.getItem('currentCollectionID');
    this.privSetting=true;
    //check the privacy setting that the user has entered
    if(document.getElementById('newPriv')['checked']==true){
      this.privSetting=false;
    };
    //get the name of the collection
    this.nameCollect=document.getElementById('newName')['value'];
    //get the description of the collection
    this.descripCollect=document.getElementById('newDescription')['value'];
    //get the userID who is editing the collection
    this.userid = localStorage.getItem('currentUserID');
    //then PUT this data into the database, to update the old collection
    this.editCollectionService.putData(this.onResponse.bind(this), this.nameCollect, this.descripCollect, this.privSetting, this.userid, collectionID);
    return false;
  }
  //when the user wants to delete a collection
  deleteCollection(){
    //get the collectionID
    let collectionID = localStorage.getItem('currentCollectionID');
    //confirm whether or not the user wants to delete
    var tf = confirm("Are you sure you want to delete this collection?");
    if(tf==true){
      //if they confirm, then send collectionID to service file to delete the collection
      this.editCollectionService.deleteData(this.onResponse.bind(this), collectionID);
    }
    else{
      //if they cancel, then navigate back to the user's collections
      this.router.navigate(['mycollections']);
    }
  }
  onResponse(res){
    
  }
}
