import { Component } from '@angular/core';
import { FamilyService } from '../../../../services/family.service';
import { FamilyStoreService } from '../../../services/stores/family-store.service';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { AuthService } from '../../../../services/auth.service';
import { faCheck, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss'],
})
export class FamilyListComponent {
  // public familyList$ = this.authService.currentUser$.pipe(
  //   mergeMap((user: User) => this.shoppingListService.getFamilyShoppingList(user.familyId)),
  //   tap((shoppingList) => {
  //     console.log(shoppingList);
  //     this.shoppingListStore.setFamilyList(shoppingList);
  //   }),
  //   shareReplay(),
  // );

  public familyList$ = this.shoppingListStore.familyList$;

  constructor(
    private authService: AuthService,
    private familyService: FamilyService,
    private familyStore: FamilyStoreService,
    private shoppingListService: ShoppingListService,
    private shoppingListStore: ShoppingListStoreService,
  ) {}

  ngOnInit() {
    this.authService.currentUser$
      .pipe(mergeMap((user) => this.shoppingListService.getFamilyShoppingList(user.familyId)))
      .subscribe((shoppingList) => {
        this.shoppingListStore.setFamilyList(shoppingList);
      });
  }

  protected readonly faPen = faPen;
  protected readonly faTrash = faTrash;
  protected readonly faCheck = faCheck;
  protected readonly faTimes = faTimes;
}
