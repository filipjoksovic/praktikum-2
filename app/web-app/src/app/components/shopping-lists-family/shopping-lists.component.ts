import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { PageDescriptorPillComponent } from '../page-descriptor-pill/page-descriptor-pill.component';

@Component({
  standalone: true,
  selector: 'app-shopping-lists-family',
  templateUrl: './shopping-lists.component.html',
  imports: [PageDescriptorPillComponent],
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists: unknown[] = [];

  constructor(private apiService: ShoppingListService) {}

  ngOnInit() {
    this.loadShoppingLists();
  }

  loadShoppingLists() {
    this.apiService.getAllShoppingLists().subscribe((lists) => {
      if (Array.isArray(lists)) {
        this.shoppingLists = lists;
        console.log(JSON.stringify(this.shoppingLists));
      } else {
        console.warn('Received non-array value:', lists);
        this.shoppingLists = [];
      }
    });
  }

  updateShoppingList(list: any[]) {
    this.apiService.updateShoppingList(list.id, list).subscribe(() => {
      this.loadShoppingLists();
    });
  }

  deleteShoppingList(id: string) {
    this.apiService.deleteShoppingList(id).subscribe(() => {
      this.loadShoppingLists();
    });
  }
}
