import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../services/shopping-list.service';
import {VoiceService} from '../../services/voice.service';
import {UploadRecordingResponse} from 'src/app/models/UploadRecordingResponse';
import {UploadTextResponse} from 'src/app/models/UploadTextResponse';
import {take} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  recording = false;
  transcript = '';
  items = [];
  listName = 'New List';

  constructor(private apiService: ShoppingListService, private voiceService: VoiceService, private router: Router) {
  }



  startStopRecording() {
    if (!this.recording) {
      this.voiceService.startRecording();
    } else {
      this.voiceService
        .stopRecording()
        .pipe(take(1))
        .subscribe((recording) => {
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
