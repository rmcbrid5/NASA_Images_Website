import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http:HttpClient) { }
  //UNUSED-------------------------------------------
  getData(callback_fun, user:string){
    var userCollections: string[] = [];
    this.http.get('/api/collections').subscribe(data => {
    console.log(data);
    for(let i=0; i<data.length; i++){
      if(data[i].creator==user){
          userCollections.push(data[i]);
        }
      }
      console.log(userCollections);
      callback_fun(userCollections);
    });
  }
  //When user searches for images
  search(callback_func, text)
  {
    //using the URL given by NASA, and the keyword from the user, and the media type set to image, get the corresponding images
    this.http.get('https://images-api.nasa.gov/search?q=' + text + '&media_type=image').subscribe(data =>
    {
      //declare a list of images
      let refs = [];
      for(let i = 0; i < data.collection.items.length; i++)
      {
        //push all of the URLs into the list
        refs.push(data.collection.items[i].links[0].href);
      }
      //send the list of images back
      callback_func(refs);
    });
  }
  
  postData(callback_fun, c:string, u:string){
    //let the body equal the passed in url and collectionID
    let body={
        imageURL: u,
        imageCollection: c
    };
    //post to database
    this.http.post('/api/images', body).subscribe();
    return false;
  }
}
