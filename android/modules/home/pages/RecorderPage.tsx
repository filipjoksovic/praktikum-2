import React from "react";
import {Animated, View} from 'react-native';
import {Button, IconButton, Surface, Text, useTheme} from 'react-native-paper';
import {BigAssRecordButton} from '../components/BigAssRecordButton';
import {useRef, useState} from 'react';
import {AudioEncoderAndroidType, AudioSourceAndroidType,} from 'react-native-audio-recorder-player';
import AudioService from '../../../services/AudioService';
import {formatDuration} from '../../shared/helpers';
import RNFS from 'react-native-fs';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {LoaderStore} from '../../shared/state/LoaderStore';
import {localization} from '../../../resources/localization';

export interface IRecorderPageProps {
  onTranscriptReceived: any;
}

export const RecorderPage = (props: IRecorderPageProps) => {
  const loaderState = LoaderStore.useState();
  const theme = useTheme();
  const audioRecorderPlayer = AudioService.getInstance().audioRecorderPlayer;

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');

  const startRecording = () => {
    pressed();
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
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: true,
          text: localization.LOADER.ROBOTS_PROCESSING_MESSAGE,
        };
      });
    }, 300);
    setTimeout(() => {
      setIsRecording(false);
      onStopRecord();
    }, 500);
  };
  const cancelRecording = async () => {
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
    setTimeout(async () => {
      setIsRecording(false);
      const path = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordingTime('00:00');
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

      console.log('path: ' + path);
      const transcript = await ShoppingListService.createTranscriptRequest(
        path,
      );
      if (transcript) {
        props.onTranscriptReceived(transcript);
      }
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: false,
        };
      });
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
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(moveTimerAnim, {
        toValue: -100,
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
    <View
      style={{
        flexGrow: 1,
      }}>
      <View>
        <Text variant="headlineLarge">{localization.RECORDER.TITLE}</Text>
        <Text variant="bodyMedium">{localization.RECORDER.DESCRIPTION}</Text>
      </View>

      <View style={{alignItems: 'center', marginTop: 50}}>
        <Animated.View
          style={{
            transform: [
              {scale: springButtonAnim},
              {translateY: moveButtonAnim},
            ],
          }}>
          <BigAssRecordButton mainCircleWidth={300} onPress={startRecording} />
        </Animated.View>
        {isRecording ? (
          <Animated.View style={{transform: [{translateY: moveTimerAnim}]}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Surface
                style={{
                  alignItems: 'center',
                  padding: 20,
                  paddingHorizontal: 40,
                  borderRadius: 50,
                }}
                theme={{...theme, roundness: 50}}>
                <Text variant="displayLarge">{recordingTime}</Text>
              </Surface>
              <IconButton
                icon={'stop-circle'}
                size={64}
                iconColor={theme.colors.tertiary}
                onPress={stopRecording}
              />
            </View>
            <Button onPress={cancelRecording} style={{marginTop: 20}}>
              {localization.GLOBAL.CANCEL_LABEL}
            </Button>
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
