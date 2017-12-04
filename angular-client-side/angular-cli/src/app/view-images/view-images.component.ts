import { Component, OnInit } from '@angular/core';
import { ViewImagesService } from '../view-images.service';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
  //declare a list of images
  refs=[];
  constructor(private viewImagesService:ViewImagesService) { 
    //get the current collection ID
    let ID = localStorage.getItem('currentCollectionID');
    //send the id to the service file to load the images
    this.viewImagesService.getData(this.onResponse.bind(this), ID);
  }

  ngOnInit() {
  }
  onResponse(res){
    //set the response from the service file to be the list of refs declared earlier
    this.refs = res;
  }
}
