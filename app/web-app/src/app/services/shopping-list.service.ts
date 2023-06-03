import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs';
import { TranscriptStoreService } from './stores/transcript-store.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private transcriptStore: TranscriptStoreService,
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

  getAllShoppingLists() {
    return this.http.get(`shoppingLists`);
  }

  updateShoppingList(id: string, updatedShoppingList: any) {
    return this.http.put(`shoppingLists/${id}`, updatedShoppingList);
  }

  deleteShoppingList(listId: string) {
    return this.http.delete(`shoppingLists/${listId}`);
  }
}
