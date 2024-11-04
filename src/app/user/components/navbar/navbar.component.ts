import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  onPrevious() {
    this.previousPage.emit();
  }

  onNext() {
    this.nextPage.emit();
  }
}
