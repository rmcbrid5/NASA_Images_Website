import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http:HttpClient) { }
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
  
  search(callback_func, text)
  {
    this.http.get('https://images-api.nasa.gov/search?q=' + text + '&media_type=image').subscribe(data =>
    {
      let refs = [];
      for(let i = 0; i < data.collection.items.length; i++)
      {
        refs.push(data.collection.items[i].links[0].href);
      }
      callback_func(refs);
    });
  }
  
  postData(callback_fun, c:string, u:string){
    let body={
        imageURL: u,
        imageCollection: c
    };
    this.http.post('/api/images', body).subscribe();
    return false;
  }
}
