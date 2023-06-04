import { Component, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { VoiceService } from '../../services/voice.service';
import { AsyncSubject, mergeMap, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { TranscriptStoreService } from '../../services/stores/transcript-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  ngUnsubscribe$ = new AsyncSubject<void>();

  public transcript$ = this.transcriptStore.transcript$.pipe(takeUntil(this.ngUnsubscribe$));
  public items: string[] = [];
  public recording = false;
  public listName = 'New List';
  public descriptorTitle = 'Record';
  public descriptorDescription: string =
    'Press the button to start recording. Upon finishing, the data will be sent for processing, returning the\n' +
    '      recognized shopping list items';

  constructor(
    private apiService: ShoppingListService,
    private voiceService: VoiceService,
    private router: Router,
    private transcriptStore: TranscriptStoreService,
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  startStopRecording() {
    // TODO bring this back once actual impl goes up. Remove store setting from component;

    // if (!this.recording) {
    //   this.voiceService.startRecording();
    // } else {
    //   this.voiceService
    //     .stopRecording()
    //     .pipe(take(1))
    //     .subscribe((recording) => {
    //       this.apiService.uploadRecording(recording).subscribe((response: UploadRecordingResponse) => {
    //         this.transcript = response.transcript;
    //       });
    //     });
    // }
    console.log('Recording');
    if (this.recording) {
      // this.transcript = "We'll need some bananas, milk, butter and toilet paper.";
      this.transcriptStore.setTranscript("We'll need some bananas, milk, butter and toilet paper.");
    }
    this.recording = !this.recording;
  }

  processTranscript() {
    // TODO refactor to not use any in items
    this.transcript$
      .pipe(
        mergeMap((text) => this.apiService.processText(text)),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe();
  }
}
