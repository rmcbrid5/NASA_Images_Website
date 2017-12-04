import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //declare a list of images and a list of collection
  refs = [];
  imageCollects = [];
  constructor(private searchService: SearchService, private router:Router) {
    //if the user is not logged in, direct them to the login page
    if(localStorage.getItem('loggedIn')=='false'){
      alert('Please log in to search NASA');
      this.router.navigate(['login']);
    }
    //get the current user's id
    let user = localStorage.getItem('currentUserID');
    //send id to the service file to get data
    this.searchService.getData(this.onGetResponse.bind(this), user);
  }

  ngOnInit() {
  }
  //when the user clicks search
  onSearch(){
    //get the keyword that the user entered
    var keyword = document.getElementById('key')['value'];
    //send keyword to service side to search for images
    this.searchService.search(this.onResponse.bind(this), keyword);
  }
  onResponse(res){
    this.refs=res;
  }
  
  onGetResponse(res){
    this.imageCollects = res;
    console.log(this.imageCollects);
    return false;
  }
  //if user wants to add this image to one of their collections
  addImage(ref){
    //get the id of the collection that they want to add to
    let collectionID=document.getElementById(ref)['value'];
    //send the id and the ref to the service file to post to the collection
    this.searchService.postData(this.onPostResponse.bind(this), collectionID, ref);
  }
  
  onPostResponse(res){
    
  }
}
