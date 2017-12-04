import { Component, OnInit } from '@angular/core';
import { ImageCollectionService } from '../image-collection.service';
import { Router } from '@angular/router';
import { RatingService } from '../rating.service';

@Component({
  selector: 'app-image-collections',
  templateUrl: './image-collections.component.html',
  styleUrls: ['./image-collections.component.css']
})
export class ImageCollectionsComponent implements OnInit {
  //declare a list of collections
  collections;
  constructor(private imageCollectService: ImageCollectionService, private router:Router, private ratingService:RatingService) { 
    //if the user is not logged in, send them back to the login page
    if(localStorage.getItem('loggedIn')=='false'){
      alert('Please log in to view more image collections');
      this.router.navigate(['login']);
    }
    //otherwise load the page with a list of the public image collections
    this.collections = this.imageCollectService.getData(this.onResponse.bind(this));
  }
  //on response from the server, set the list of collections defined above to the response
  onResponse(res:string){
    this.collections=res;
    return false;
  }
  ngOnInit() {
  }
  //when the user rates a collection
  onRating(ID, Rating){
    //the rating is equal to the rating set on the html page
    let rate = document.getElementById(Rating)['value'];
    //get the user ID from localStorage
    let uID = localStorage.getItem('currentUserID');
    //send info to the service file function
    this.ratingService.checkData(this.onRatingResponse.bind(this), ID, uID, rate);
  }
  //when the user chooses to view a collection
  viewCollection(ID){
    //set the currentCollectionID to the id passed into the function
    localStorage.setItem('currentCollectionID', ID);
    //navigate to the view-images page
    this.router.navigate(['view-images']);
  }
  onRatingResponse(){
    
  }
}
