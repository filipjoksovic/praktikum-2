import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHttpOptions() {
    let httpOptions = {};
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${currentUser.accessToken}`,
        }),
      };
    }
    return httpOptions;
  }

  uploadRecording(data: Blob) {
    console.log('Upload Recording Called');
    const formData: FormData = new FormData();
    formData.append('file', data, 'recording.wav');
    return this.http.post(`${environment.apiBaseUrl}/uploads/wav`, formData, this.getHttpOptions());
  }

  processText(data: string) {
    console.log('Process Text Called');
    return this.http.post(`${environment.apiBaseUrl}/uploads/text`, { text: data }, this.getHttpOptions());
  }

  saveShoppingList(list: any) {
    return this.http.post(
      `${environment.apiBaseUrl}/shoppingLists/user/${this.authService.currentUserValue.id}`,
      list,
      this.getHttpOptions(),
    );
  }

  getAllShoppingLists() {
    return this.http.get(`${environment.apiBaseUrl}/shoppingLists`, this.getHttpOptions());
  }

  updateShoppingList(id: string, updatedShoppingList: any) {
    return this.http.put(`${environment.apiBaseUrl}/shoppingLists/${id}`, updatedShoppingList, this.getHttpOptions());
  }

  deleteShoppingList(listId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/shoppingLists/${listId}`, this.getHttpOptions());
  }
}
