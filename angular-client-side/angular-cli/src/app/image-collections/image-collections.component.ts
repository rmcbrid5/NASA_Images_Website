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
  collections;
  constructor(private imageCollectService: ImageCollectionService, private router:Router, private ratingService:RatingService) { 
    if(localStorage.getItem('loggedIn')=='false'){
      alert('Please log in to view more image collections');
      this.router.navigate(['login']);
    }
    this.collections = this.imageCollectService.getData(this.onResponse.bind(this));
  }
  onResponse(res:string){
    this.collections=res;
    console.log(res);
    return false;
  }
  ngOnInit() {
  }
  onRating(ID, Rating){
    let rate = document.getElementById(Rating)['value'];
    localStorage.setItem('currentCollectionID', ID);
    let uID = localStorage.getItem('currentUserID');
    console.log(rate);
    this.ratingService.checkData(this.onRatingResponse.bind(this), ID, uID, rate);
  }
  viewCollection(ID){
    localStorage.setItem('currentCollectionID', ID);
    this.router.navigate(['view-images']);
  }
  onRatingResponse(){
    
  }
}
