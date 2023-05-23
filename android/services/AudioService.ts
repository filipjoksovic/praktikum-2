import AudioRecorderPlayer from 'react-native-audio-recorder-player';

class AudioService {
  private static instance: AudioService;
  audioRecorderPlayer: AudioRecorderPlayer;

  private constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }

    return AudioService.instance;
  }
}

export default AudioService;
