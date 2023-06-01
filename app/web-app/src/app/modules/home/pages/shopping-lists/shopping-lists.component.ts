import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { tap } from 'rxjs';
import { faCheck, faCheckDouble, faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  idsForCheck: string[] = [];
  allSelected = false;
  faPen = faPen;

  public selectedList$ = this.shoppingListStore.selectedList$.pipe(
    tap((item) => (this.selectedId = (item && item.id) || '')),
  );
  public shoppingLists$ = this.shoppingListStore.shoppingLists$;
  public selectedId = '';

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

  protected readonly faSearch = faSearch;
  isEdit: boolean;

  toggleEditMode() {
    console.log('editing');
    if (this.isEdit) {
      console.log('Should send req1uest');
      console.log(this.idsForCheck);
    }
    this.isEdit = !this.isEdit;
  }

  addOrRemove(id: string) {
    if (this.idsForCheck.includes(id)) {
      this.idsForCheck = this.idsForCheck.filter((itemId) => itemId !== id);
    } else {
      this.idsForCheck.push(id);
    }
  }

  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faCheckDouble = faCheckDouble;

  selectAll() {
    this.allSelected = !this.allSelected;
  }

  cancelEdit() {
    this.idsForCheck = [];
    this.isEdit = false;
  }

  shouldDisplayAsChecked(item) {
    return this.allSelected || item.checked || this.idsForCheck.includes(item.id);
  }
}
