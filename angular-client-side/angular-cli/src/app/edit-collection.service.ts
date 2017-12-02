import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable()
export class EditCollectionService {
    constructor(private http:HttpClient, private router:Router) { }
    putData(callback_fun, name, description, privacy, user, ID){
        let body = {
            name: name,
            descrip: description,
            priv: privacy,
            creator: user,
        };
        this.http.put('/api/collections/'+ID, body).subscribe();
        alert('Collection Updated!');
        this.router.navigate(['mycollections']);
        return false;
    }
    deleteData(callback_fun, ID){
        this.http.delete('/api/collections/'+ID).subscribe();
        alert('Collection Deleted!');
        this.router.navigate(['mycollections']);
        return false;
    }
}
