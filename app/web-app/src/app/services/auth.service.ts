import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser$: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    this._currentUser$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUser$.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, { email, password }).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser$.next(user);
        return user;
      }),
    );
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser$.next(null);
  }
}
