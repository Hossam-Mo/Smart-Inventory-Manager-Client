import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav';
import { ItemsPageComponent } from './components/itemsPage/itemsPage';
import { AddItemComponent } from './components/addPage/addPage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, ItemsPageComponent, AddItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentPage: string = 'items';

  protected readonly title = signal('Inventory_manager');

  changePage(page: string) {
    this.currentPage = page;
  }
}
