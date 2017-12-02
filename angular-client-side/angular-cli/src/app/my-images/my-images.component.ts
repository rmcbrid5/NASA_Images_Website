import { Component, OnInit } from '@angular/core';
import { MyImagesService } from '../my-images.service';

@Component({
  selector: 'app-my-images',
  templateUrl: './my-images.component.html',
  styleUrls: ['./my-images.component.css']
})
export class MyImagesComponent implements OnInit {
  refs = [];
  constructor(private myImageService:MyImagesService) { 
    let ID = localStorage.getItem('currentCollectionID');
    this.myImageService.getData(this.onResponse.bind(this), ID);
  }

  ngOnInit() {
  }
  removeImage(ref){
    let ID = localStorage.getItem('currentCollectionID');
    this.myImageService.removeData(this.onResponse.bind(this), ref);
  }
  onResponse(res){
    this.refs = res;
  }
}
