import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTermChanged: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.searchTermChanged.emit(this.searchTerm); 
  }
}
