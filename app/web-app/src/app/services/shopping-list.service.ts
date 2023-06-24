import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {EMPTY, of, tap} from 'rxjs';
import {TranscriptStoreService} from './stores/transcript-store.service';
import {ToasterService} from './toaster.service';
import {ShoppingListStoreService} from './stores/shopping-list-store.service';
import {IListItem, IShoppingList, ListItemDTOV2, ShoppingListDTOV2} from '../models/IShoppingListsResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private transcriptStore: TranscriptStoreService,
    private toaster: ToasterService,
    private shoppingListStore: ShoppingListStoreService,
  ) {
  }

  uploadRecording(data: Blob) {
    console.log('Upload Recording Called');
    const formData: FormData = new FormData();
    formData.append('file', data, 'recording.wav');
    return this.http.post(`uploads/wav`, formData);
  }

  processText(data: string) {
    if (data) {
      console.log('Process Text Called');
    return this.http.post(`uploads/text`, {text: data}).pipe(
      map((response: { summary: string[] }) => response.summary),
      tap((items) => this.transcriptStore.setTranscribedList(items)),);
    }
    else {
      return [];
    }
  }

  saveShoppingList(list: { name: string, items: string[] }, activeSegment: 'personal' | 'family') {
    if (activeSegment === 'personal') {
      return this.http.post(`shoppingLists/user/${this.authService.currentUserValue.id}`, list).pipe(tap(()=>this.toaster.success("Success!", "New personal shopping list created")));
    } else if (activeSegment === 'family') {
      if (this.authService.currentUserValue.familyId) {
        return this.http.post(`shoppingLists/family/${this.authService.currentUserValue.familyId}`, list).pipe(tap(()=>this.toaster.success("Success!", "Family list updated")));
      } else {
        this.toaster.error("Errror", "This user is not in a family")
        return of(null);
      }
    } else {
      return EMPTY;
    }
  }

  getUserShoppingLists() {
    const user = this.authService.getLocalUser();
    return this.http.get<IShoppingList[]>(`shoppingLists/user/${user.id}`);
  }


  updateShoppingList(shoppingListId: string, updatedShoppingList: any) {
    return this.http
      .put(`shoppingLists/${shoppingListId}`, updatedShoppingList)
      .pipe(tap((response) => this.toaster.success('Success!', 'Shopping list successfully updated')));
  }

  deleteShoppingList(listId: string) {
    return this.http.delete<IShoppingList>(`shoppingLists/${listId}`).pipe(
      tap((list) => {
        this.shoppingListStore.removeList(list.id);
        this.toaster.success('Success!', 'Shopping list has been successfully deleted');
      }),
    );
  }

  search(searchList: string) {
    return this.getUserShoppingLists().pipe(
      map((items) => items.filter((item) => item.name.toLowerCase().includes(searchList.toLowerCase()))),
    );
  }

  bulkEdit(listId: string, newItems: IListItem[], allSelected: boolean) {
    console.log(newItems)
    return this.http.post<IShoppingList>(`shoppingLists/${listId}/bulkEdit`, {items: newItems, allSelected}).pipe(
      tap((response) => {
        this.shoppingListStore.updateShoppingList(response);
        this.toaster.success('Success!', 'Shopping list successfully updated.');
        console.log("övo je response" + response.itemList)
      }),
    );
  }

  getFamilyShoppingList(familyId: string) {
    return this.http.get<ShoppingListDTOV2>(`shoppingLists/family/${familyId}`);
  }

  getImageForItem(itemName: string) {
    return this.http.get<any>(`pexels/search/${itemName}`);
  }

  deleteFamilyItem(listId: string, id: string) {
    const user = this.authService.getLocalUser();
    return this.http
      .delete<ShoppingListDTOV2>(`shoppingLists/${user.id}/${listId}/${id}`)
      .pipe(tap(() => this.toaster.success('Success!', 'Item successfully deleted from family list')));
  }

  checkOffFamilyItem(listId: string, itemId: string) {
    return this.http
      .put<ShoppingListDTOV2>(`shoppingLists/${listId}/${itemId}/completeItem`, {})
      .pipe(tap(() => this.toaster.success('Success!', 'Item successfully checked off family list')));
  }

  updateItem(listId: string, itemId: string, shoppingItem: { id: string; name: string; checked: boolean }) {
    console.log(shoppingItem);
    return this.http.put<ListItemDTOV2>(`shoppingLists/${listId}/${itemId}`, { ...shoppingItem }).pipe(
      tap((response) => {
        this.toaster.success('Success!', 'Item successfully updated');
      }),
    );
}

}
