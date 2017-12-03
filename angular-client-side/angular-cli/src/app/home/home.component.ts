import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCollectionService } from '../image-collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collections=[];
  constructor(private router:Router, private imageCollectionService:ImageCollectionService) { 
    this.imageCollectionService.getData(this.onResponse.bind(this));
  }

  ngOnInit() {
  }
  
  goLogin()
  {
    this.router.navigate(['login']);
    return false;
  }
  onResponse(res){
    this.collections=res;
  }
}
