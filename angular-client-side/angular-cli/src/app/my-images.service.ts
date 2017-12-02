import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MyImagesService {

    constructor(private http:HttpClient) { }
    getData(callback_fun, collectionID){
        let refs=[];
        this.http.get('/api/images').subscribe(data=>{
            console.log(data);
            for(var i=0; i<data.length; i++){
                if(data[i].imageCollection==collectionID){
                    refs.push(data[i]);
                }
            }
        })
        callback_fun(refs);
    }
    removeData(callback_fun, imageID){
        console.log(imageID);
        this.http.delete('/api/images/'+imageID).subscribe();
    }
}
