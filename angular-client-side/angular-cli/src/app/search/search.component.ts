import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  refs = [];
  imageCollects = [];
  constructor(private searchService: SearchService, private router:Router) {
    if(localStorage.getItem('loggedIn')=='false'){
      alert('Please log in to create and view collections');
      this.router.navigate(['login']);
    }
    let user = localStorage.getItem('currentUserID');
    this.searchService.getData(this.onGetResponse.bind(this), user);
  }

  ngOnInit() {
  }
  onSearch(){
    var keyword = document.getElementById('key')['value'];
    this.searchService.search(this.onResponse.bind(this), keyword);
  }
  onResponse(res){
    this.refs=res;
  }
  
  onGetResponse(res){
    this.imageCollects = res;
    console.log(this.imageCollects);
    return false;
  }
  
  addImage(ref){
    let collectionID=document.getElementById(ref)['value'];
    this.searchService.postData(this.onPostResponse.bind(this), collectionID, ref);
  }
  
  onPostResponse(res){
    
  }
}
