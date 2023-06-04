import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs/operators';
import { tap } from 'rxjs';
import { TranscriptStoreService } from './stores/transcript-store.service';
import { ToasterService } from './toaster.service';
import { ShoppingListStoreService } from './stores/shopping-list-store.service';
import { IShoppingList } from '../models/IShoppingListsResponseDTO';

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
  ) {}

  uploadRecording(data: Blob) {
    console.log('Upload Recording Called');
    const formData: FormData = new FormData();
    formData.append('file', data, 'recording.wav');
    return this.http.post(`uploads/wav`, formData);
  }

  processText(data: string) {
    console.log('Process Text Called');
    return this.http.post(`uploads/text`, { text: data }).pipe(
      map((response: { summary: string[] }) => response.summary),
      tap((items) => this.transcriptStore.setTranscribedList(items)),
    );
  }

  saveShoppingList(list: any) {
    return this.http.post(`shoppingLists/user/${this.authService.currentUserValue.id}`, list);
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
    return this.http.delete(`shoppingLists/${listId}`);
  }

  search(searchList: string) {
    return this.getUserShoppingLists().pipe(
      map((items) => items.filter((item) => item.name.toLowerCase().includes(searchList.toLowerCase()))),
    );
  }
}
