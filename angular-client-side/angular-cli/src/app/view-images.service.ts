import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewImagesService {

    constructor(private http:HttpClient) { }
    //get images from a collection
    getData(callback_fun, anID){
        //declare a list of images
        let refs=[];
        //sent get request
        this.http.get('/api/images').subscribe(data=>{
            for(var i=0; i<data.length; i++){
                //find the images whose collectionID equals the current collectionID
                if(data[i].imageCollection==anID){
                    //if they match, add this image to the list
                    refs.push(data[i]);
                }
            }
        })
        //send back the list of images
        callback_fun(refs);
    }
}
