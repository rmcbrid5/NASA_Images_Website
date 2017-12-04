import { Component, OnInit } from '@angular/core';
import { MycollectionsService } from '../mycollections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycollections',
  templateUrl: './mycollections.component.html',
  styleUrls: ['./mycollections.component.css']
})
export class MycollectionsComponent implements OnInit {
  //declare variables that will be needed
  collections;
  privSetting;
  nameCollect;
  descripCollect;
  userid;
  constructor(private myCollectService:MycollectionsService, private router:Router) {
    //if the user is not logged in, send them back to the home page
    if(localStorage.getItem('loggedIn')=='false'){
      alert('Please log in to create and view collections');
      this.router.navigate(['login']);
    }
    //load the page with the user's collections
    this.collections = this.myCollectService.getData(this.onResponse.bind(this));
  }
  //on the response of the get function
  onResponse(res:string){
    //set the declared list to equal the response
    this.collections = res;
    console.log(res);
    return false;
  }
  ngOnInit() {
  }
  //when the user wants to create a new collection
  newCollection(){
    //automatically set the privacy setting to true (private)
    this.privSetting=true;
    //check the privacy setting declared by the user
    if(document.getElementById('priv')['checked']==true){
      this.privSetting=false;
    };
    //get the name of the collection
    this.nameCollect=document.getElementById('name')['value'];
    //get the description of the collection
    this.descripCollect=document.getElementById('description')['value'];
    //get the current user's ID
    this.userid = localStorage.getItem('currentUserID');
    //then send all of the data to the mycollectionservice to be posted to the database
    this.myCollectService.postData(this.onResponse.bind(this), this.nameCollect, this.descripCollect, this.privSetting, this.userid);
    //then navigate back to their collections page
    this.router.navigate(['mycollections']);
    return false;
  }
  //when the user chooses to edit a collection
  editCollection(collectionID){
    //set the currentID of the collection to be edited
    localStorage.setItem('currentCollectionID', collectionID);
    //navigate to the edit-collections page
    this.router.navigate(['edit-collections']);
  }
  //when the user wants to view their collection
  editImages(collectionID){
    //set the currentID of the collection to be viewed
    localStorage.setItem('currentCollectionID', collectionID);
    //navigate to the my-images page
    this.router.navigate(['my-images']);
  }
}
