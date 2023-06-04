import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IShoppingList } from '../../models/IShoppingListsResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListStoreService {
  private readonly _selectedList$ = new BehaviorSubject<any>(null);
  public selectedList$ = this._selectedList$.asObservable();

  private _shoppingLists$: BehaviorSubject<IShoppingList[]> = new BehaviorSubject([]);
  public shoppingLists$ = this._shoppingLists$.asObservable();

  constructor() {}

  public getSelectedList() {
    return this._selectedList$.value;
  }

  public setSelectedList(list: any) {
    this._selectedList$.next(list);
  }

  public getShoppingLists() {
    return this._shoppingLists$.value;
  }

  public setShoppingLists(value: any) {
    return this._shoppingLists$.next(value);
  }

  setSelectedListById(id) {
    const found = this._shoppingLists$.value.find((list) => list.id === id);
    if (found) {
      this._selectedList$.next(found);
    }
  }

  updateShoppingList(list: IShoppingList) {
    this._shoppingLists$.next(this._shoppingLists$.value.map((l) => (list.id === l.id ? list : l)));
  }
}
