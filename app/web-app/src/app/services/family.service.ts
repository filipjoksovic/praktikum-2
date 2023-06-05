import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IFamily } from '../models/IFamily';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { User } from '../models/User';
import { FamilyStoreService } from '../modules/services/stores/family-store.service';
import { ToasterService } from './toaster.service';
import { JoinRequestDTO } from '../models/JoinRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private familyStore: FamilyStoreService,
    private toastService: ToasterService,
  ) {}

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
      }),
    );
  }

  public updateFamilyCode(familyCode: string) {
    const user = this.authService.currentUserValue;
    if (!user.familyId) {
      throw new Error('User has no family');
    }
    return this.http.post<IFamily>(`families/${user.familyId}/code`, { code: familyCode }).pipe(
      tap((family) => {
        this.toastService.success('Success!', 'Family invite code updated');
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

    return this.http.post<JoinRequestDTO>(`joinRequests/${user.id}/${inviteCode}`, {}).pipe(
      tap((response) => {
        this.familyStore.setExistingRequest(response);
        this.toastService.success('Success!', 'Family join request has been sent succesfully');
      }),
    );
  }

  public getRequests() {
    const user = this.authService.currentUserValue;
    return this.http.get<JoinRequestDTO[]>(`joinRequests/${user.familyId}`).pipe(
      tap((res) => {
        this.familyStore.setPendingRequests(res);
      }),
    );
  }

  public getRequestsForUser() {
    const user = this.authService.currentUserValue;
    return this.http
      .get<JoinRequestDTO>(`joinRequests/user/${user.id}`)
      .pipe(tap((request) => this.familyStore.setExistingRequest(request)));
  }

  public acceptRequest(request: JoinRequestDTO) {
    return this.http.post<IFamily>(`joinRequests/${request.id}/accept`, {}).pipe(
      tap((response) => {
        this.familyStore.setFamily(response);
        this.familyStore.removePendingRequest(request.id);
        this.toastService.success('Success!', 'Join request has been approved');
      }),
    );
  }

  public rejectRequest(request: JoinRequestDTO) {
    return this.http.post<IFamily>(`joinRequests/${request.id}/reject`, {}).pipe(
      tap((response) => {
        this.familyStore.removePendingRequest(request.id);
        this.toastService.success('Success!', 'Join request has been rejected');
      }),
    );
  }

  public getMembers(): Observable<User[]> {
    const user = this.authService.currentUserValue;
    return this.http.get<User[]>(`families/${user.familyId}/members`).pipe(
      catchError((err) => {
        console.log('Error ', err);
        return EMPTY;
      }),
    );
  }

  cancelRequest(requestId: string) {
    return this.http.delete(`joinRequests/${requestId}`).pipe(
      tap((response) => {
        this.familyStore.setExistingRequest(null);
        this.toastService.success('Success!', 'Join request was successfully canceled');
      }),
    );
  }

  removeUser(familyId: string, user: User) {
    return this.http.delete<IFamily>(`families/${familyId}/${user.id}/remove`).pipe(
      tap((response: IFamily) => {
        this.toastService.success('Success!', 'User successfully removed from the family');
        this.familyStore.setFamily(response);
      }),
    );
  }

  createFamily(body: { inviteCode: string; name: string }) {
    const user = this.authService.getLocalUser();
    return this.http.post<IFamily>(`families/${user.id}`, body).pipe(
      tap((family: IFamily) => {
        this.familyStore.setFamily(family);
        this.authService.updateLocalUser({ familyId: family.id, owner: true });
        this.toastService.success('Success!', 'Family has been successfully created');
      }),
    );
  }

  inviteMembers(emailsToAdd: string[]) {
    const user = this.authService.currentUserValue;
    return this.http.post<any>(`joinRequests/invite/${user.familyId}`, { emails: emailsToAdd }).pipe(
      tap((res) => {
        this.toastService.success('Success!', 'Invites have been sent');
      }),
    );
  }
}
