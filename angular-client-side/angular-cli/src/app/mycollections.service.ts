import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MycollectionsService {
  constructor(private http:HttpClient) { }
  getData(callback_fun) {
    var userCollections: string[] = [];
    this.http.get('/api/collections').subscribe(data => {
      console.log(localStorage.getItem('currentUserID'));
      console.log(data);
      for(let i=0; i<data.length; i++){
        if(data[i].creator==localStorage.getItem('currentUserID')){
          console.log(data[i].name);
          userCollections.push(data[i].name);
        }
      }
      console.log(userCollections);
      callback_fun(userCollections);
    });
  }
  postData(callback_fun, n:string, d:string, p:Boolean, i:string){
    let body = {
        name: n,
        descrip: d,
        priv: p,
        creator: i,
        ratings: null,
        numOfRatings: 0
    };
    this.http.post('/api/collections', body).subscribe();
    return false;
  }

}
