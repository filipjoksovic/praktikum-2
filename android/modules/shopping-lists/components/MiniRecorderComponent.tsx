import {useFocusEffect} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton, Surface, Text, TouchableRipple} from 'react-native-paper';
import AudioService from '../../../services/AudioService';
import RNFS from 'react-native-fs';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

export interface IMiniRecorderComponent {
  recorderVisible: boolean;
  recordingStopped: any;
  onTranscriptReceived: any;
  onRecordingCancelled: any;
}

export const MiniRecorderComponent = (props: IMiniRecorderComponent) => {
  const handlePress = () => {
    console.log('Pressed');
    Animated.timing(moveSectionAnim, {
      toValue: 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      stopRecording();
      props.recordingStopped();
    }, 500);
  };

  const moveSectionAnim = useRef(new Animated.Value(300)).current;
  const scaleSectionAnim = useRef(new Animated.Value(0.9)).current;

  const audioRecorderPlayer = AudioService.getInstance().audioRecorderPlayer;

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');

  const startRecording = () => {
    // return;
    console.log('Button pressed');
    setIsRecording(true);
    onStartRecord();
  };
  const stopRecording = () => {
    console.log('called');
    setIsRecording(false);
    onStopRecord();
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
      // setRecordingTime(formatDuration(e.currentPosition));
      // return;
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
      }
    } catch (error) {
      console.log('Error in stopping the recorder: ', error);
    }
  };

  const cancelRecording = async () => {
    try {
      const path = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordingTime('00:00');
      props.onRecordingCancelled();
      //   return;
    } catch (error) {
      console.log('Error in stopping the recorder: ', error);
    }
  };

  useEffect(() => {
    console.log('use effect recorder called');
    Animated.timing(moveSectionAnim, {
      toValue: 80,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleSectionAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.cubic,
        }),
        Animated.timing(scaleSectionAnim, {
          toValue: 0.9,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.cubic,
        }),
      ]),
    ).start();
    startRecording();
  }, []);

  return props.recorderVisible ? (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 200,
        transform: [{translateY: moveSectionAnim}],
      }}>
      <Surface
        style={{
          padding: 20,
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
          margin: 10,
          borderRadius: 20,
        }}>
        <Animated.View
          style={{
            height: 80,
            width: 80,
            borderRadius: 100,
            overflow: 'hidden',
            shadowColor: 'black',
            elevation: 10,
            transform: [{scale: scaleSectionAnim}],
          }}>
          <TouchableRipple
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#AA4D4D',
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
            onPress={handlePress}>
            <Animated.View
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                overflow: 'hidden',
                shadowColor: 'black',
                elevation: 10,
                transform: [{scale: scaleSectionAnim}],
              }}>
              <TouchableRipple
                onPress={handlePress}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  backgroundColor: '#C19797',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    shadowColor: 'black',
                    elevation: 10,
                    borderRadius: 100,
                    overflow: 'hidden',
                  }}>
                  <TouchableRipple
                    onPress={handlePress}
                    style={{
                      backgroundColor: '#E9E9E9',
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: 'black',
                      elevation: 10,
                    }}>
                    <View />
                  </TouchableRipple>
                </View>
              </TouchableRipple>
            </Animated.View>
          </TouchableRipple>
        </Animated.View>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          When done speaking, press the button and the items will be added to
          the list.
        </Text>
        <IconButton
          style={{position: 'absolute', top: 0, right: 0}}
          icon={'close'}
          onPress={cancelRecording}
        />
      </Surface>
    </Animated.View>
  ) : (
    <></>
  );
};
