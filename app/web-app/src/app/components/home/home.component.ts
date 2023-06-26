import {Component, OnDestroy} from '@angular/core';
import {ShoppingListService} from '../../services/shopping-list.service';
import {VoiceService} from '../../services/voice.service';
import {AsyncSubject, mergeMap, take, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {TranscriptStoreService} from '../../services/stores/transcript-store.service';
import {formatDuration} from "../../shared/helpers";
import {map} from "rxjs/operators";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";
import {UploadRecordingResponse} from "../../models/UploadRecordingResponse";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import {faRecordVinyl} from "@fortawesome/free-solid-svg-icons/faRecordVinyl";
import {faKeyboard, faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  ngUnsubscribe$ = new AsyncSubject<void>();

  public activeSegment: "loading" | "voice" | "manual"  = "voice";
  public transcript$ = this.transcriptStore.transcript$.pipe(takeUntil(this.ngUnsubscribe$)); // pogledaj ovo
  public isLoading: boolean = false;
  public items: string[] = [];
  public recording = false;
  public listName = 'New List';
  public descriptorTitle = 'Record';
  public descriptorDescription: string =
    'Press the button to start recording. Upon finishing, the data will be sent for processing, returning the\n' +
    '      recognized shopping list items';
  public recorderStopwatch$ = this.transcriptStore.recorderStopwatch$.pipe(map(value => formatDuration(value)));

  protected readonly faStop = faStop;
  protected readonly faRecordVinyl = faRecordVinyl;
  protected readonly faKeyboard = faKeyboard;
  protected readonly faTimes = faTimes;
  protected readonly faHome = faHome;
  protected readonly faUser = faUser;


  constructor(
    private apiService: ShoppingListService,
    private voiceService: VoiceService,
    private router: Router,
    private transcriptStore: TranscriptStoreService,
  ) {
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


  startStopRecording() {
    // TODO bring this back once actual impl goes up. Remove store setting from component;

    if (!this.recording) {
      this.voiceService.startRecording();
      this.transcriptStore.startRecording(true);
    } else {
      this.setActiveSegment("loading")
      this.transcriptStore.stopRecording();
      this.voiceService
        .stopRecording()
        .pipe(take(1))
        .subscribe((recording) => {
          this.apiService.uploadRecording(recording).subscribe((response: UploadRecordingResponse) => {
            this.transcriptStore.setTranscript(response.transcript);
            this.setActiveSegment('manual');
          });
        });
    }
    this.recording = !this.recording;
    // if(!this.recording){
    //   this.transcriptStore.startRecording(true);
    // }
    // console.log('Recording');
    // if (this.recording) {
    //   this.transcriptStore.stopRecording();
    //   // this.transcript = "We'll need some bananas, milk, butter and toilet paper.";
    //   this.transcriptStore.setTranscript("We'll need some bananas, milk, butter and toilet paper.");
    // }
    // this.recording = !this.recording;
  }

  processTranscript() {
    this.transcript$
      .pipe(
        mergeMap((text) => this.apiService.processText(text)),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe();
    this.transcriptStore.setShowItems(true);
    
  }

  cancelTranscript() {
    this.transcriptStore.setTranscript("");
    this.transcriptStore.setShowItems(false);
    this.activeSegment = "voice";

  }

  setActiveSegment(mode: "voice" | "manual" | "loading") {
    this.activeSegment = mode;

  }

  cancelRecording() {
    this.transcriptStore.stopRecording();
    this.voiceService
      .stopRecording().subscribe();
    this.recording = false;

  }

  setTranscript(event: any) {
    this.transcriptStore.setTranscript(event.target.value);

  }


}
