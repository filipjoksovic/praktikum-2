/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Voice from '@react-native-voice/voice';
import VoiceRecorderComponent from './components/voice-recorder/VoiceRecorderComponent';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
  };
  return (
    <SafeAreaView
      style={{height: '100%', backgroundColor: 'black', padding: 20}}>
      <Text>hello</Text>
      <VoiceRecorderComponent></VoiceRecorderComponent>
    </SafeAreaView>
  );
}

export default App;
