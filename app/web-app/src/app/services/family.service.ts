import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environment';
import { IFamily } from '../models/IFamily';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  constructor(private authService: AuthService, private http: HttpClient) {}

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

  public getFamily() {
    const user = this.authService.currentUserValue;
    return this.http.get<IFamily>(`${environment.apiBaseUrl}/families/user/${user.id}`, this.getHttpOptions());
  }

  public updateFamily() {}

  public exitFamily() {}

  public acceptRequest() {}

  public rejectRequest() {}
}
