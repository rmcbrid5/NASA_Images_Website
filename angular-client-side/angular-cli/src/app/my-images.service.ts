import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MyImagesService {

    constructor(private http:HttpClient) { }
    getData(callback_fun, collectionID){
        //declare a list of images
        let refs=[];
        //get all images
        this.http.get('/api/images').subscribe(data=>{
            for(var i=0; i<data.length; i++){
                //if the image's collection id is the same as the current collection ID
                if(data[i].imageCollection==collectionID){
                    //add it to the list of images
                    refs.push(data[i]);
                }
            }
        })
        //send back the list of images
        callback_fun(refs);
    }
    //when removing an images
    removeData(callback_fun, imageID){
        //send a request to delete this image from the database, using the send ID
        this.http.delete('/api/images/'+imageID).subscribe();
    }
}
