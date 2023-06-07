import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root',
})
export class VoiceService {
  private record;
  private recording = false;
  private subject = new Subject<Blob>();
  private stream: MediaStream;

  startRecording(): void {
    if (!this.recording) {
      this.recording = true;
      const mediaConstraints = {
        video: false,
        audio: true,
      };
      navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
        this.stream = stream;
        const options = {
          mimeType: 'audio/wav',
          numberOfAudioChannels: 1,
          sampleRate: 44100, //44100 - optimal for voice!
        };
        // Start actual recording
        const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
      });
    }
  }

  stopRecording(): Observable<Blob> {
    if (this.recording) {
      this.recording = false;
      this.record.stop((blob) => {
        // stop the audio tracks
        this.stream.getTracks().forEach((track) => track.stop());
        // destroy the recorder object
        this.record = null;
        this.subject.next(blob);
      });
    }
    return this.subject.asObservable();
  }
}
