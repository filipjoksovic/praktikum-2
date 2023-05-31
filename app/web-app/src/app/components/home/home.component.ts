import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { VoiceService } from '../../services/voice.service';
import { UploadRecordingResponse } from 'src/app/models/UploadRecordingResponse';
import { UploadTextResponse } from 'src/app/models/UploadTextResponse';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  recording: boolean = false;
  transcript: string = '';
  items: string[] = [];
  listName: string = 'New List';


  constructor(private apiService: ApiService, private voiceService: VoiceService, private router: Router) { }

  ngOnInit(): void { }

  startStopRecording() {
    if (!this.recording) {
      this.voiceService.startRecording();
    } else {
      this.voiceService.stopRecording().pipe(take(1)).subscribe((recording) => {
        this.apiService.uploadRecording(recording).subscribe((response: UploadRecordingResponse) => {
          this.transcript = response.transcript;
        });
      });
    }
    this.recording = !this.recording;
  }


  processTranscript() {
    this.apiService.processText(this.transcript).subscribe((response: UploadTextResponse) => {
      this.items = response.summary;
    });
  }

  saveShoppingList() {
    this.apiService
      .saveShoppingList({
        name: this.listName,
        items: this.items,
      })
      .subscribe((response) => {
        this.router.navigate(['/lists']);
      });
  }
}
