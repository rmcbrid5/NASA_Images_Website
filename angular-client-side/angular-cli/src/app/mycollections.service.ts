import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MycollectionsService {
  constructor(private http:HttpClient) { }
  //called when the page is constructed
  getData(callback_fun) {
    //declare a list for the collections
    var userCollections: string[] = [];
    //get the collections in the database
    this.http.get('/api/collections').subscribe(data => {
      for(let i=0; i<data.length; i++){
        //if the creator of the collection is the current user
        if(data[i].creator==localStorage.getItem('currentUserID')){
          //then add the collection to the list
          userCollections.push(data[i]);
        }
      }
      //send the list back to the component.ts page
      callback_fun(userCollections);
    });
  }
  //when the user wants to make a new collection
  postData(callback_fun, n:string, d:string, p:Boolean, i:string){
    //declare the body
    let body = {
        name: n,
        descrip: d,
        priv: p,
        creator: i,
        ratings: 0,
        numOfRatings: 0
    };
    //send to the database to be posted
    this.http.post('/api/collections', body).subscribe();
    return false;
  }

}
