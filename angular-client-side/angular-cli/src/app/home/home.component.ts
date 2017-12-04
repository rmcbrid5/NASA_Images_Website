import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCollectionService } from '../image-collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //define lists to be used
  singleArray=[];
  collections=[];
  constructor(private router:Router, private imageCollectionService:ImageCollectionService) {
    //load the page with image collections
    this.imageCollectionService.getRateData(this.onResponse.bind(this));
  }

  ngOnInit() {
  }
  //if the user chooses to view a collection
  viewCollection(ID){
    //find the ID of the collection and set it to the localStorage variable
    localStorage.setItem('currentCollectionID', ID);
    //navigate to the view-images component
    this.router.navigate(['view-images']);
  }
  //when the user clicks the login button
  goLogin()
  {
    //navigate to the login page
    this.router.navigate(['login']);
    return false;
  }
  //when the response is received(from constructor get request)
  onResponse(collections, ratings){
    //declare a list for the ratings
    var collectRatings = ratings;
    //declare a list for the collections
    var collection = collections;
    for(var i=0; i<ratings.length; i++){
      for(var j=i+1; j<ratings.length; j++){
        //if the rating of the first is less than the rating of the second, switch the order
        //and switch the order of the collections as well so that they still match
        if(ratings[i]<ratings[j]){
          var collectTemp = collections[i];
          var temp=ratings[i];
          collections[i]=collections[j];
          ratings[i]=ratings[j];
          collections[j]=collectTemp;
          ratings[j]=temp;
        }
      }
    }
    //declare a new list
    let newArray=[];
    for (var i = 0; i < ratings.length; i++) {
      //if the list reaches 10 items, dont add anymore
      if(i>=10){
        break;
      }
      //otherwise push the information into a single array
      newArray.push({
                      id: collections[i]._id,
                      name: collections[i].name,
                      rating: ratings[i]
                    });
    }
    //send back the array
    this.collections=newArray;
  }
}
