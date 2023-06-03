import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, tap } from 'rxjs';
import { ToastMessage, ToastMessageType } from '../models/toaster.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private _messages$ = new BehaviorSubject<ToastMessage[] | null>(null);
  public messages$ = this._messages$.asObservable()
  constructor() {}

  public toast(messageType: ToastMessageType, title: string, content: string) {
    if (this._messages$.value) {
      this._messages$.next([{ messageType, title, content }, ...this._messages$.value]);
    } else {
      this._messages$.next([{ messageType, title, content }]);
    }

  }

  public success(title: string, content: string) {
    this.toast(ToastMessageType.SUCCESS, title, content);
  }

  public error(title: string, content: string) {
    this.toast(ToastMessageType.DANGER, title, content);
  }

  public general(title: string, content: string) {
    this.toast(ToastMessageType.PRIMARY, title, content);
  }

  public warning(title: string, content: string) {
    this.toast(ToastMessageType.WARNING, title, content);
  }

  removeMessage(message: ToastMessage) {
    if (this._messages$.value) {
      this._messages$.next(this._messages$.value.filter((m) => message !== m));
    }
  }
}
