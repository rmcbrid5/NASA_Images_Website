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
    postData(callback_fun, collectID, UserID, Rate){
        let body = {
            collectionID: collectID,
            User: UserID,
            Rating: Rate
        }
        this.http.post('/api/ratings', body).subscribe();
        callback_fun();
    }
    checkData(callback_fun, collectID, UserID, Rate){
        this.http.get('/api/collections').subscribe(data=>{
            this.owner="false";
            this.entered="false";
            for(var i=0; i<data.length; i++){
                if(data[i].creator==UserID && data[i]._id==collectID){
                    this.owner="true";
                }
            }
            if(this.owner=="true"){
                alert("Cannot rate your own collection");
            }
            if(this.owner!="true"){
                this.http.get('/api/ratings').subscribe(newData=>{
                    alert(UserID);
                    alert(collectID);
                    console.log(newData);
                    for(var j=0; j<newData.length; j++){
                        if(newData[j].User==UserID && newData[j].collectionID==collectID){
                            this.entered="true";
                            localStorage.setItem('oldID', newData[j]._id);
                        }
                    }
                    alert(this.entered);
                    if(this.entered=="true"){
                        let body={
                            collectionID: collectID,
                            User: UserID,
                            Rating: Rate
                        }
                        this.http.put('/api/ratings/'+localStorage.getItem('oldID'), body).subscribe();
                        alert('Your rating has been updated.');
                    }
                    else{
                        let body={
                            collectionID: collectID,
                            User: UserID,
                            Rating: Rate
                        }
                        this.http.post('/api/ratings', body).subscribe();
                        alert('Rating has been posted.');
                    }
                })
                
            }
        })
        localStorage.setItem('firstTime', 'true');
    }
}
