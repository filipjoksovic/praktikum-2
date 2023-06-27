import {Component, OnInit} from '@angular/core';
import {FamilyService} from "../../../../services/family.service";
import {FamilyStoreService} from "../../../services/stores/family-store.service";
import {ShoppingListService} from "../../../../services/shopping-list.service";
import {ShoppingListStoreService} from "../../../../services/stores/shopping-list-store.service";
import {concat, mergeMap, shareReplay, startWith, switchMap, take, tap} from "rxjs";
import {User} from "../../../../models/User";
import {AuthService} from "../../../../services/auth.service";
import {ListItemDTOV2} from "../../../../models/IShoppingListsResponseDTO";

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent {

  public familyList$ = this.shoppingListStore.familyList$;

  constructor(
    private authService: AuthService,
    private familyService: FamilyService,
    private familyStore: FamilyStoreService,
    private shoppingListService: ShoppingListService,
    private shoppingListStore: ShoppingListStoreService) {
  
    }
 
    ngOnInit() {
      this.authService.currentUser$.pipe(
        mergeMap((user: User) => this.shoppingListService.getFamilyShoppingList(user.familyId)),
        tap(shoppingList => this.shoppingListStore.setFamilyList(shoppingList))
      ).subscribe();
    }

    handleDelete(item: ListItemDTOV2) {
      this.shoppingListStore.familyList$.pipe(
        take(1),
        tap(list => this.shoppingListStore.setFamilyList({
          ...list,
          items: list.items.filter(i => item.id !== i.id)
        }))
      ).subscribe();
    }
    

  
}
