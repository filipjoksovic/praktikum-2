import {Animated, View} from 'react-native';
import {Button, Surface, Text, useTheme} from 'react-native-paper';
import {BigAssRecordButton} from '../components/BigAssRecordButton';
import {useEffect, useRef, useState} from 'react';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import AudioService from '../../../services/AudioService';
import {formatDuration} from '../../shared/helpers';
import RNFS from 'react-native-fs';
import {ShoppingListService} from '../../../services/ShoppingListService';

export interface IRecorderPageProps {
  onTranscriptReceived: any;
}

export const RecorderPage = (props: IRecorderPageProps) => {
  const theme = useTheme();
  const audioRecorderPlayer = AudioService.getInstance().audioRecorderPlayer;

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');

  const startRecording = () => {
    pressed();
    // return;
    console.log('Button pressed');
    setIsRecording(true);
    onStartRecord();
  };
  const stopRecording = () => {
    console.log('called');
    setTimeout(() => {
      Animated.spring(springButtonAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();
      Animated.timing(moveButtonAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(moveTimerAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 300);
    }, 300);
    setTimeout(() => {
      setIsRecording(false);
      onStopRecord();
    }, 500);
  };

  const onStartRecord = async () => {
    const dirPath = RNFS.ExternalDirectoryPath;
    const path = `${dirPath}/hello.wav`;

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };
    try {
      await audioRecorderPlayer.startRecorder(path, audioSet);
    } catch (e) {
      console.log('somethiung');
    }
    audioRecorderPlayer.addRecordBackListener(e => {
      console.log(e);
      setRecordingTime(formatDuration(e.currentPosition));
      return;
    });
    audioRecorderPlayer.setVolume(1.0).catch(err => console.log('caught'));
  };
  // Record/Stop Button handler
  const handleRecording = async () => {
    if (!isRecording) {
      await onStartRecord();
    } else {
      await onStopRecord();
    }
    setIsRecording(!isRecording);
  };
  const onStopRecord = async () => {
    try {
      const path = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordingTime('00:00');
      //   return;

      console.log('path: ' + path);
      const transcript = await ShoppingListService.createTranscriptRequest(
        path,
      );
      if (transcript) {
        props.onTranscriptReceived(transcript);
        // setShoppingListPrompt(transcript);
      }
    } catch (error) {
      console.log('Error in stopping the recorder: ', error);
    }
  };
  const [animationSpringState, setAnimationSpringState] = useState(1);
  const [animationMoveState, setAnimationMoveState] = useState(1);

  const springButtonAnim = useRef(
    new Animated.Value(animationSpringState),
  ).current;
  const moveButtonAnim = useRef(new Animated.Value(0)).current;
  const moveTimerAnim = useRef(new Animated.Value(0)).current;
  const loopButtonAnim = useRef(new Animated.Value(1)).current;
  const pressed = () => {
    Animated.spring(springButtonAnim, {
      toValue: 0.6,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
    Animated.timing(moveButtonAnim, {
      toValue: -300,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(moveTimerAnim, {
        toValue: -200,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.loop(
        Animated.timing(loopButtonAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
      ).start();
    }, 200);

    setTimeout(() => {}, 500);
  };

  return (
    <View>
      <View style={{marginBottom: 150}}>
        <Text variant="displayLarge">Record</Text>
        <Text variant="bodyMedium">
          Once you start recording, we will automatically create a shopping list
          for you.
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Animated.View
          style={{
            transform: [
              {scale: springButtonAnim},
              {translateY: moveButtonAnim},
            ],
          }}>
          <BigAssRecordButton
            mainCircleWidth={300}
            onPress={startRecording}></BigAssRecordButton>
        </Animated.View>
        {isRecording ? (
          <Animated.View style={{transform: [{translateY: moveTimerAnim}]}}>
            <Surface
              style={{alignItems: 'center', padding: 20, borderRadius: 50}}
              theme={{...theme, roundness: 50}}>
              <Text variant="displayLarge">{recordingTime}</Text>
            </Surface>
            <Button onPress={stopRecording}>Stop recording</Button>
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
