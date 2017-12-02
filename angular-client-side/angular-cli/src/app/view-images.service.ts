import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewImagesService {

    constructor(private http:HttpClient) { }
    getData(callback_fun, anID){
        let refs=[];
        this.http.get('/api/images').subscribe(data=>{
            for(var i=0; i<data.length; i++){
                if(data[i].imageCollection==anID){
                    refs.push(data[i]);
                }
            }
        })
        callback_fun(refs);
    }
}
