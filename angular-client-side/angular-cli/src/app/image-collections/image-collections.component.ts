import { Component, OnInit } from '@angular/core';
import { ImageCollectionService } from '../image-collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-collections',
  templateUrl: './image-collections.component.html',
  styleUrls: ['./image-collections.component.css']
})
export class ImageCollectionsComponent implements OnInit {
  collections;
  constructor(private imageCollectService: ImageCollectionService, private router:Router) { 
    this.collections = this.imageCollectService.getData(this.onResponse.bind(this));
  }
  onResponse(res:string){
    this.collections=res;
    console.log(res);
    return false;
  }
  ngOnInit() {
  }
  onRating(ID){
    localStorage.setItem('currentCollectionID', ID);
  }
  viewCollection(ID){
    localStorage.setItem('currentCollectionID', ID);
    this.router.navigate(['view-images']);
  }

}
