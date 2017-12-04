import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class EditCollectionService {
    constructor(private http:HttpClient, private router:Router) { }
    //when the user is editing their collection
    putData(callback_fun, name, description, privacy, user, ID){
        //set the body
        let body = {
            name: name,
            descrip: description,
            priv: privacy,
            creator: user,
        };
        //send a put request using the ID of the current collection
        this.http.put('/api/collections/'+ID, body).subscribe();
        //alert the user to let them know that the collection has been updated
        alert('Collection Updated!');
        //once the collection is updated, bring the user back to their collections page
        this.router.navigate(['mycollections']);
        return false;
    }
    //when the user wants to delete their collection
    deleteData(callback_fun, ID){
        //take the ID and send a request using that ID to delete the collection from the database
        this.http.delete('/api/collections/'+ID).subscribe();
        //alert the user that their collection has been deleted
        alert('Collection Deleted!');
        //set the user back to their collections page
        this.router.navigate(['mycollections']);
        return false;
    }
}
