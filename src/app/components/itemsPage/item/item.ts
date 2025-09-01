import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../types/item';

@Component({
  selector: 'item-component',
  templateUrl: 'item.html',
  styleUrl: 'item.css',
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;
  @Input() editMod: boolean = false;

  @Output() delete = new EventEmitter<Item>();
  @Output() edit = new EventEmitter<Item>();

  constructor() {}

  ngOnInit() {}

  onDelete() {
    this.delete.emit(this.item);
  }
  onEdit() {
    this.editMod = !this.editMod;
  }
  onConfirmEdit(name: string, quantity: string, price: string) {
    this.editMod = false;
    const qty = Number(quantity);
    const prc = Number(price);

    if (this.item == null) return;

    if (name != null && name.trim() !== '') {
      this.item.name = name;
    }

    if (!isNaN(qty) && qty >= 0) {
      this.item.quantity = qty;
    }

    if (!isNaN(prc) && prc >= 0) {
      this.item.price = prc;
    }

    this.edit.emit(this.item);
  }
}
