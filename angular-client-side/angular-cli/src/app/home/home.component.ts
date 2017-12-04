import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCollectionService } from '../image-collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  singleArray=[];
  collections=[];
  constructor(private router:Router, private imageCollectionService:ImageCollectionService) { 
    this.imageCollectionService.getRateData(this.onResponse.bind(this));
  }

  ngOnInit() {
  }
  viewCollection(ID){
    localStorage.setItem('currentCollectionID', ID);
    alert(localStorage.getItem('currentCollectionID'));
    this.router.navigate(['view-images']);
  }
  goLogin()
  {
    this.router.navigate(['login']);
    return false;
  }
  onResponse(collections, ratings){
    var collectRatings = ratings;
    var collection = collections;
    for(var i=0; i<ratings.length; i++){
      for(var j=i+1; j<ratings.length; j++){
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
    let newArray=[];
    for (var i = 0; i < ratings.length; i++) {
      if(i>=10){
        break;
      }
      newArray.push({
                      id: collections[i]._id,
                      name: collections[i].name,
                      rating: ratings[i]
                    });
    }
    console.log(newArray);
    this.collections=newArray;
  }
}
