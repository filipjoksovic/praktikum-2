import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ListItemDTOV2 } from '../../../../models/IShoppingListsResponseDTO';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-family-list-item',
  templateUrl: './family-list-item.component.html',
  styleUrls: ['./family-list-item.component.scss'],
})
export class FamilyListItemComponent implements OnInit {
  @Input()
  public item: ListItemDTOV2;
  @Input()
  public familyId: string;
  @Input()
  public listId: string;
  public isEdit = false;

  protected readonly faTrash = faTrash;
  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faPen = faPen;
  private backupName: string;

  constructor(private shoppingListStore: ShoppingListStoreService, private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.backupName = this.item.name;
  }

  enableEdit() {
    this.isEdit = true;
  }

  deleteItem() {
    this.shoppingListService
      .deleteFamilyItem(this.listId, this.item.id)
      .pipe(tap((shoppingList) => this.shoppingListStore.setFamilyList(shoppingList)))
      .subscribe();
  }

  checkOffItem() {
    this.shoppingListService
      .checkOffFamilyItem(this.listId, this.item.id)
      .pipe(tap(() => (this.item.checked = true)))
      .subscribe();
  }

  uncheckItem() {
    this.shoppingListService.checkOffFamilyItem(this.listId, this.item.id);
  }

  editName() {
    this.isEdit = false;
    if (this.backupName === this.item.name) {
      return;
    }
    this.shoppingListService
      .updateItem(this.listId, this.item.id, { id: this.item.id, name: this.item.name, checked: this.item.checked })
      .subscribe((shoppingList) => {
        this.backupName = this.item.name;
      });
  }
}
