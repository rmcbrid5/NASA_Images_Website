import { Component, OnInit } from '@angular/core';
import { ImageCollectionService } from '../image-collection.service';

@Component({
  selector: 'app-image-collections',
  templateUrl: './image-collections.component.html',
  styleUrls: ['./image-collections.component.css']
})
export class ImageCollectionsComponent implements OnInit {
  collections;
  constructor(private imageCollectService: ImageCollectionService) { 
    this.collections = this.imageCollectService.getData(this.onResponse.bind(this));
  }
  onResponse(res:string){
    this.collections=res;
    console.log(res);
    return false;
  }
  ngOnInit() {
  }

}
