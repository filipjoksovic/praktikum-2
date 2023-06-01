import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists: any[] = [];

  public selectedList$ = this.shoppingListStore.selectedList$.pipe(tap((item) => console.log(item)));
  public shoppingLists$ = this.shoppingListStore.shoppingLists$;

  constructor(private shoppingListService: ShoppingListService, private shoppingListStore: ShoppingListStoreService) {}

  ngOnInit() {
    this.shoppingListService
      .getAllShoppingLists()
      .pipe(tap((lists) => this.shoppingListStore.setShoppingLists(lists)))
      .subscribe();
  }

  getShoppingList(id) {
    console.log('get shopping list');
    this.shoppingListStore.setSelectedListById(id);
  }
}
