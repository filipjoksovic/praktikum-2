import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {STYLESHEET} from './resources/styles/STYLESHEET';
import {RegisterPage} from './modules/auth/pages/RegisterPage';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const stylesheet = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: STYLESHEET.colors.bg_light,
    },
  });

  return (
    <SafeAreaView style={stylesheet.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={STYLESHEET.colors.bg_light}
      />
      {/*<LoginPage />*/}
      <RegisterPage />
    </SafeAreaView>
  );
}

export default App;
