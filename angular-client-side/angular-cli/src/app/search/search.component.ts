import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  refs = [];
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  onSearch(){
    var keyword = document.getElementById('key')['value'];
    this.searchService.search(this.onResponse.bind(this), keyword);
  }
  onResponse(res){
    this.refs=res;
  }
}
