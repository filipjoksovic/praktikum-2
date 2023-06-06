import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import { AccountSetupDTO } from '../models/AccountSetupDTO';
import { ToastMessage } from '../models/toaster.model';
import { ToasterService } from './toaster.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  public currentUser$: Observable<User>;

  private _currentUser$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router, private toastService : ToasterService) {
    this._currentUser$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUser$.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`auth/login`, {email, password}).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser$.next(user);
      }),
    );
  }

  public register(user: User) {
    return this.http.post<User>(`auth/register`, user).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser$.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this._currentUser$.next(null);
    this.router.navigateByUrl("/auth");
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

  public setupAccount(dto: AccountSetupDTO) {
    return this.http.put<User>(`users/account`, dto).pipe(
      tap((updatedUser: User) => {
        this.toastService.success('Success!', 'You completed the setup and the data has been updated');
        this.setupAccountUpdate(dto);
      }),
    );
}   

  public setupAccountUpdate(dto:AccountSetupDTO) {
    const localUser: User = JSON.parse(localStorage.getItem('currentUser'));
    localUser.name = dto.firstName
    localUser.surname = dto.lastName
    localUser.dob = dto.dob
    this.updateLocalUser(localUser)
  }

  public updateLocalUser(data: Partial<User>) {
    console.log(data)
    const localUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this._currentUser$.next({...localUser, ...data});
    localStorage.setItem('currentUser', JSON.stringify({...localUser, ...data}));
  }

}
