import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranscriptStoreService {
  private _transcript$ = new BehaviorSubject<string>('');
  public transcript$ = this._transcript$.asObservable();

  private _transcribedList$ = new BehaviorSubject<string[]>([]);
  public transcribedList$ = this._transcribedList$.asObservable();

  constructor() {}

  public setTranscript(transcript: string): void {
    this._transcript$.next(transcript);
  }

  public getTranscriptValue(): string {
    return this._transcript$.value;
  }

  public setTranscribedList(list: string[]) {
    console.log(list);
    this._transcribedList$.next(list);
  }

  public getTranscribedListVlue(): string[] {
    return this._transcribedList$.value;
  }

  addToList(item: string) {
    this._transcribedList$.next([item, ...this._transcribedList$.value]);
  }
}
