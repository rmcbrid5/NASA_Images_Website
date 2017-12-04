import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageCollectionService {
    constructor(private http:HttpClient) { }
    getData(callback_fun) {
      //declare a list of collections
      var publicCollections=[];
      this.http.get('/api/collections').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].priv==false){
            publicCollections.push(data[i]);
          }
        }
        callback_fun(publicCollections); 
      })
    }
    getRateData(callback_fun){
      //begin same as getData functino to find the public collections
      var publicCollections = [];
      this.http.get('/api/collections').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].priv==false){
            publicCollections.push(data[i]);
          }
        }
        //once there is a list of public collections, now sort ratings
        this.http.get('/api/ratings').subscribe(newData =>{
          //create an array for the ratings
          let ratings = [];
          for(var i=0; i<publicCollections.length; i++){
            //declare variable to count the number of ratings on a collection
            let numOfRatings=0;
            for(var j=0; j<newData.length;j++){
              //if the ID of the collection matches the collection ID of that rating, add that rating to the list
              if(publicCollections[i]._id==newData[j].collectionID){
                //if it is the first rating, no calculations need to be made, just set the rating of that collection equal to the rating
                if(numOfRatings==0){
                  ratings.push(newData[j].Rating);
                }
                //otherwise calculations need to be made
                else{
                  //the new rating willl equal the number of old ratings times the new rating, plus the brand new rating, divided by the number of ratings
                  ratings[i]=(numOfRatings*ratings[i]+newData[j].Rating)/(numOfRatings+1);
                }
                //increment the number of ratings
                numOfRatings+=1;
              }
            }
            //if the number of ratings on the collection is 0, add 0 as the rating to make sure that the rating is not undefined
            if(numOfRatings==0){
              ratings.push(0);
            }
          }
          callback_fun(publicCollections, ratings);
        })
      })
    }
}
