import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  @Output() pageChanger = new EventEmitter<string>();

  goToAddPage() {
    console.log('Navigating to Add Page');
    this.pageChanger.emit('add');
  }
  goToItemsPage() {
    this.pageChanger.emit('items');
  }
}
