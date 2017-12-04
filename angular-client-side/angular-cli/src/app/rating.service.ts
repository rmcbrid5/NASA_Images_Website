import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RatingService {
    owner;
    oldRatingID;
    entered;
    constructor(private http:HttpClient) {
        this.entered="false";
    }
    //NOT USED-----------------------------------------------------
    postData(callback_fun, collectID, UserID, Rate){
        let body = {
            collectionID: collectID,
            User: UserID,
            Rating: Rate
        }
        this.http.post('/api/ratings', body).subscribe();
        callback_fun();
    }
    //data must be checked to see whether a post or put should be user
    checkData(callback_fun, collectID, UserID, Rate){
        //get all of the collections from the database
        this.http.get('/api/collections').subscribe(data=>{
            //set the variables off to equal false
            this.owner="false";
            this.entered="false";
            for(var i=0; i<data.length; i++){
                //check to make sure the user is not the owner of the collection that they are trying to rate
                if(data[i].creator==UserID && data[i]._id==collectID){
                    this.owner="true";
                }
            }
            if(this.owner=="true"){
                //if they are, alert that they are not allowed to rate their own collection
                alert("Cannot rate your own collection");
            }
            if(this.owner!="true"){
                //if they are not the owner, send a get request to get the ratings
                this.http.get('/api/ratings').subscribe(newData=>{
                    //iterate through to see if the user has rated the collection before
                    for(var j=0; j<newData.length; j++){
                        //if the current user id and current collection id equal the user and collection ids in the database,
                        //that means that they have rated that collection before
                        if(newData[j].User==UserID && newData[j].collectionID==collectID){
                            //so set entered to equal true, since we entered this if statement
                            this.entered="true";
                            //create a storage item to hold onto the id of the old rating
                            localStorage.setItem('oldID', newData[j]._id);
                        }
                    }
                    //if they have rated before
                    if(this.entered=="true"){
                        let body={
                            collectionID: collectID,
                            User: UserID,
                            Rating: Rate
                        }
                        //use a PUT request, to update the old rating, and alert the user that their rating has been updated
                        this.http.put('/api/ratings/'+localStorage.getItem('oldID'), body).subscribe();
                        alert('Your rating has been updated.');
                    }
                    else{
                        let body={
                            collectionID: collectID,
                            User: UserID,
                            Rating: Rate
                        }
                        //use a POST request, since the user has never rated the collection before
                        this.http.post('/api/ratings', body).subscribe();
                        alert('Rating has been posted.');
                    }
                })
                
            }
        })
        localStorage.setItem('firstTime', 'true');
    }
}
