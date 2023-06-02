import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environment';
import { IFamily } from '../models/IFamily';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { User } from '../models/User';

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
    if (!user.familyId) {
      return of(null);
    }
    return this.http.get<IFamily>(`${environment.apiBaseUrl}/families/user/${user.id}`, this.getHttpOptions());
  }

  public updateFamily() {}

  public exitFamily() {}

  public sendRequest(inviteCode: string) {
    const user = this.authService.currentUserValue;
    console.log({
      userId: user.id || '',
      familyId: '',
      inviteCode: inviteCode,
      id: '',
    });

    return this.http.post(
      `${environment.apiBaseUrl}/joinRequests`,
      {
        userId: user.id || '',
        familyId: '',
        inviteCode: inviteCode,
        id: '',
      },
      this.getHttpOptions(),
    );
  }

  public getRequests() {
    const user = this.authService.currentUserValue;

    return this.http
      .get(`${environment.apiBaseUrl}/requestJoins/${user.familyId}`, this.getHttpOptions())
      .pipe(tap((res) => console.log(res)));
  }

  public acceptRequest() {}

  public rejectRequest() {}

  public getMembers(): Observable<User[]> {
    const user = this.authService.currentUserValue;
    return this.http
      .get<User[]>(`${environment.apiBaseUrl}/families/${user.familyId}/members`, this.getHttpOptions())
      .pipe(
        catchError((err) => {
          console.log('Error ', err);
          return EMPTY;
        }),
      );
  }
}
