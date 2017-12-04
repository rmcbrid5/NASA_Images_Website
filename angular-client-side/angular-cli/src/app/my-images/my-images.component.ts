import { Component, OnInit } from '@angular/core';
import { MyImagesService } from '../my-images.service';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.css']
})
export class MyImagesComponent implements OnInit {
  //declare the list of images
  refs = [];
  constructor(private myImageService:MyImagesService) { 
    //get the ID of the current collection
    let ID = localStorage.getItem('currentCollectionID');
    //load all of the images within that collection
    this.myImageService.getData(this.onResponse.bind(this), ID);
  }

  ngOnInit() {
  }
  //remove image from a collection
  removeImage(ref){
    //get the current collection ID
    let ID = localStorage.getItem('currentCollectionID');
    //send ID to service to remove item
    this.myImageService.removeData(this.onResponse.bind(this), ref);
  }
  onResponse(res){
    this.refs = res;
  }
}
