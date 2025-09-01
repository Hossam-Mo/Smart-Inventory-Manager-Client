import { Component, OnInit } from '@angular/core';
import { ItemComponent } from './item/item';
import { Item } from '../../types/item';
import { ItemService } from '../../services/ItemService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'items-page',
  imports: [ItemComponent, CommonModule, FormsModule],
  templateUrl: 'itemsPage.html',
  styleUrl: 'itemsPage.css',
})
export class ItemsPageComponent implements OnInit {
  items: Item[] = [];
  loading: boolean = false;

  selectedFilter: string = 'low-stock';
  lowStockValue: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: string = 'name';

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems(params: any = {}) {
    this.loading = true;
    this.itemService.getItems(params).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
        console.log('Items fetched:', data);
      },
      error: (err) => {
        console.error('Error fetching items:', err);
        this.loading = false;
      },
    });
  }

  applyFilters() {
    if (this.selectedFilter === 'low-stock' && this.lowStockValue != null) {
      this.getLowStockItems();
    }

    if (this.selectedFilter === 'price-range') {
      const params: any = { sortBy: this.sortBy };
      if (this.minPrice != null) params.minPrice = this.minPrice;
      if (this.maxPrice != null) params.maxPrice = this.maxPrice;
      this.fetchItems(params);
    }
  }

  deleteItem(item: Item) {
    if (item == null) {
      return;
    }
    this.itemService.deleteItem(item.id).subscribe({
      next: (data) => {
        console.log('Item deleted:', data);

        this.items = this.items.filter((i) => i.id !== item.id);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      },
    });
  }

  updateItem(item: Item) {
    if (item == null) {
      return;
    }

    this.itemService.updateItem(item.id, item).subscribe({
      next: (data) => {
        console.log('Item updated:', data);
      },

      error: (err) => {
        console.log('error updating item:', err);
      },
    });
  }

  getLowStockItems() {
    if (this.lowStockValue == null) {
      return;
    }
    this.loading = true;
    this.itemService.getLowStockItems(this.lowStockValue).subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error fetching low stock items:', err);
      },
    });
    this.loading = false;
  }
}
