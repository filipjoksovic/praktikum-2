import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environment';
import { IFamily } from '../models/IFamily';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { User } from '../models/User';
import { FamilyStoreService } from '../modules/services/stores/family-store.service';
import { ToasterService } from "./toaster.service";

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  constructor(private authService: AuthService, private http: HttpClient, private familyStore: FamilyStoreService, private toastService:ToasterService) {}

  public getFamily() {
    const user = this.authService.currentUserValue;
    if (!user.familyId) {
      return of(null);
    }
    return this.http.get<IFamily>(`families/user/${user.id}`);
  }

  public updateFamily(familyPartial: Partial<IFamily>) {
    const user = this.authService.currentUserValue;
    if (!user.familyId) {
      throw new Error('User has no family');
    }
    return this.http.put<IFamily>(`families/${user.familyId}`, familyPartial).pipe(
      tap((family) => {
        this.familyStore.setFamily(family);
        this.toastService.success('Success!', 'Family data has been updated');
      })
    );
  }

  public updateFamilyCode(familyCode: string) {
    const user = this.authService.currentUserValue;
    if (!user.familyId) {
      throw new Error('User has no family');
    }
    return this.http.post<IFamily>(`families/${user.familyId}/code`, { code: familyCode }).pipe(
      tap((family) => {
        this.toastService.success("Success!","Family invite code updated")
        this.familyStore.setFamily(family);
      }),
    );
  }

  public exitFamily() {}

  public sendRequest(inviteCode: string) {
    const user = this.authService.currentUserValue;
    console.log({
      userId: user.id || '',
      familyId: '',
      inviteCode: inviteCode,
      id: '',
    });

    return this.http.post(`joinRequests`, {
      userId: user.id || '',
      familyId: '',
      inviteCode: inviteCode,
      id: '',
    });
  }

  public getRequests() {
    const user = this.authService.currentUserValue;

    return this.http.get(`requestJoins/${user.familyId}`).pipe(tap((res) => console.log(res)));
  }

  public acceptRequest() {}

  public rejectRequest() {}

  public getMembers(): Observable<User[]> {
    const user = this.authService.currentUserValue;
    return this.http.get<User[]>(`families/${user.familyId}/members`).pipe(
      catchError((err) => {
        console.log('Error ', err);
        return EMPTY;
      }),
    );
  }
}
