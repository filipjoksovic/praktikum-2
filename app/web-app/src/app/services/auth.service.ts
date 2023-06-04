import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$: Observable<User>;

  private _currentUser$: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this._currentUser$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUser$.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`auth/login`, { email, password }).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser$.next(user);
        return user;
      }),
    );
  }

  public register(user: User) {
    return this.http.post<User>(`auth/register`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser$.next(null);
  }

  public getLocalUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  public getUser() {
    const localUser = this.getLocalUser();
    return this.http.get<User>(`users/${localUser.id}`).pipe(
      tap((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser$.next(user);
      }),
    );
  }

  public updateLocalUser(data: Partial<User>) {
    const localUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this._currentUser$.next({ ...localUser, ...data });
    localStorage.setItem('currentUser', JSON.stringify({ ...localUser, ...data }));
  }
}
