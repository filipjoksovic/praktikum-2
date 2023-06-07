import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, Subject, takeUntil} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranscriptStoreService {
  private _transcript$ = new BehaviorSubject<string>('');
  public transcript$ = this._transcript$.asObservable();

  private _showItems$ = new BehaviorSubject<boolean>(false);
  public showItems$ = this._showItems$.asObservable();

  private _transcribedList$ = new BehaviorSubject<string[]>([]);
  public transcribedList$ = this._transcribedList$.asObservable();

  private _recorderStopwatch$ = new BehaviorSubject(0);
  public recorderStopwatch$ = this._recorderStopwatch$.asObservable();

  private _isRecording$ = new Subject();

  constructor() {}

  public setTranscript(transcript: string): void {
    this._transcript$.next(transcript);
  }

  public getTranscriptValue(): string {
    return this._transcript$.value;
  }

  public setShowItems(showItems: boolean): void {
    this._showItems$.next(showItems);
  }

  public getShowItemsValue(): boolean {
    return this._showItems$.value;
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

  public setRecorderStopWatch(value:number){
    this._recorderStopwatch$.next(value);
  }

  startRecording(b: boolean) {
    console.log("starting recording");
    interval(1000).pipe(takeUntil(this._isRecording$)).subscribe(value=> {
      console.log(value);
      this._recorderStopwatch$.next(value + 1)
    });
  }
  stopRecording(){
    this._isRecording$.next(true);
    this._isRecording$.complete();
    this.setRecorderStopWatch(0);
  }

  removeItem(item: string) {
    this._transcribedList$.next(this._transcribedList$.value.filter(i=>i !== item));
  }
}
