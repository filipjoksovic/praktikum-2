import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFamily } from '../../../models/IFamily';
import { User } from '../../../models/User';
import { JoinRequestDTO } from '../../../models/JoinRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class FamilyStoreService {
  private _family$: BehaviorSubject<IFamily | null> = new BehaviorSubject<IFamily | null>(null);
  public family$ = this._family$.asObservable();

  private _familyMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public familyMembers$ = this._familyMembers$.asObservable();

  private _existingRequest$: BehaviorSubject<JoinRequestDTO> = new BehaviorSubject(null);
  public existingRequest$ = this._existingRequest$.asObservable();

  private _pendingRequests$: BehaviorSubject<JoinRequestDTO[] | null> = new BehaviorSubject(null);
  public pendingRequests$ = this._pendingRequests$.asObservable();

  constructor() {}

  public getFamily() {
    return this._family$.value;
  }

  public setFamily(family: IFamily) {
    this._family$.next(family);
  }

  public updateFamily(family: Partial<IFamily>) {
    this._family$.next({ ...this._family$.value, ...family });
  }

  public setFamilyMembers(members: User[]) {
    this._familyMembers$.next(members);
  }

  public getFamilyMembers() {
    return this._familyMembers$.value;
  }

  public setExistingRequest(value: JoinRequestDTO) {
    this._existingRequest$.next(value);
  }

  public getPendingRequests() {
    return this._pendingRequests$.value;
  }

  public setPendingRequests(pendingRequests: JoinRequestDTO[]) {
    return this._pendingRequests$.next(pendingRequests);
  }

  public updatePendingRequests(pendingRequests: JoinRequestDTO[]) {
    return this._pendingRequests$.next([...pendingRequests, ...this._pendingRequests$.value]);
  }

  removePendingRequest(id: string) {
    return this.setPendingRequests([...this._pendingRequests$.value.filter((req) => req.id !== id)]);
  }
}
