import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFamily } from '../../../models/IFamily';
import { User } from '../../../models/User';

@Injectable({
  providedIn: 'root',
})
export class FamilyStoreService {
  private _family$: BehaviorSubject<IFamily | null> = new BehaviorSubject<IFamily | null>(null);
  public family$ = this._family$.asObservable();

  private _familyMembers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public familyMembers$ = this._familyMembers$.asObservable();

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
}
