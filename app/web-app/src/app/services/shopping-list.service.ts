import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {EMPTY, of, tap} from 'rxjs';
import {TranscriptStoreService} from './stores/transcript-store.service';
import {ToasterService} from './toaster.service';
import {ShoppingListStoreService} from './stores/shopping-list-store.service';
import {IShoppingList} from '../models/IShoppingListsResponseDTO';

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
    console.log('Process Text Called');
    return this.http.post(`uploads/text`, {text: data}).pipe(
      map((response: { summary: string[] }) => response.summary),
      tap((items) => this.transcriptStore.setTranscribedList(items)),
    );
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
    return this.http.get<IShoppingList[]>(`shoppingLists/${user.id}`);
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

  bulkCheck(listId: string, idsForCheck: string[], allSelected: boolean) {
    return this.http.post<IShoppingList>(`shoppingLists/${listId}/bulkCheck`, {ids: idsForCheck, allSelected}).pipe(
      tap((response) => {
        this.shoppingListStore.updateShoppingList(response);
        this.toaster.success('Success!', 'Shopping list successfully updated.');
      }),
    );
  }

  bulkUncheck(listId: string, idsForCheck: string[], allSelected: boolean) {
    return this.http.post<IShoppingList>(`shoppingLists/${listId}/bulkUncheck`, {ids: idsForCheck, allSelected}).pipe(
      tap((response) => {
        this.shoppingListStore.updateShoppingList(response);
        this.toaster.success('Success!', 'Shopping list successfully updated.');
      }),
    );
  }

  getFamilyShoppingList(familyId: string) {
    return this.http.get<IShoppingList>(`shoppingLists/family/${familyId}`);
  }
}
