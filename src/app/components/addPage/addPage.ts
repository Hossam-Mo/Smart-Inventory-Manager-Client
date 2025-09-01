import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ItemService } from '../../services/ItemService';

import { RequestItem } from '../../types/requestItem';
@Component({
  selector: 'add-page',
  templateUrl: 'addPage.html',
  styleUrl: 'addPage.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AddItemComponent {
  itemForm;

  constructor(private fb: FormBuilder, private itemService: ItemService, private router: Router) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      quantity: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const formValue = this.itemForm.value;
    const newItem: RequestItem = {
      name: formValue.name ?? '',
      price: formValue.price ?? 0,
      description: formValue.description ?? '',
      quantity: formValue.quantity ?? 0,
    };

    this.itemService.addItem(newItem).subscribe({
      next: (data) => {
        console.log('Item added:', data);
      },
      error: (err) => {
        console.error('Error adding item:', err);
      },
    });

    this.itemForm.reset();
  }
}
