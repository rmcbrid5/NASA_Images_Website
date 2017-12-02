import { Component, OnInit } from '@angular/core';
import { ViewImagesService } from '../view-images.service';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
  refs=[];
  constructor(private viewImagesService:ViewImagesService) { 
    let ID = localStorage.getItem('currentCollectionID');
    this.viewImagesService.getData(this.onResponse.bind(this), ID);
  }

  ngOnInit() {
  }
  onResponse(res){
    this.refs = res;
  }
}
