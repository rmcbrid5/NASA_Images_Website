import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http:HttpClient) { }
  getData(callback_fun, k:string){
        
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
}
