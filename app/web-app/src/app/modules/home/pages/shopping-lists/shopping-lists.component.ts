import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { tap } from 'rxjs';
import { faEye, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  shoppingLists: any[] = [];
  faTimes = faTimes;
  faPen = faPen;

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

  protected readonly faEye = faEye;

  isSelectedList(selectedList: any, listId: string) {
    console.log(selectedList);
    return selectedList && selectedList.id === listId;
  }

  protected readonly faSearch = faSearch;
}
