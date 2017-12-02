import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImageCollectionService {
    constructor(private http:HttpClient) { }
    getData(callback_fun) {
      var publicCollections: string[] = [];
      this.http.get('/api/collections').subscribe(data => {
        for(let i=0; i<data.length; i++){
          if(data[i].priv==false){
            publicCollections.push(data[i]);
          }
        }
        callback_fun(publicCollections);
      });
      return false;
    }
}
