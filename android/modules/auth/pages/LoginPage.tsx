import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BUTTONS, STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';
import React from 'react';
import {valueOf} from 'jest';

export const LoginPage = () => {
  const [userAuth, setUserAuth] = React.useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});
  const stylesheet = StyleSheet.create({
    container: {
      height: 100,
      padding: 30,
      backgroundColor: STYLESHEET.colors.bg_light,
      color: STYLESHEET.colors.text_light,
      flex: 1,
    },
    text: {
      color: STYLESHEET.colors.text_light,
    },
  });

  const handleChange = ({name, value}: {name: string; value: string}) => {
    console.log('Change occured', name, value);
  };

  return (
    <ScrollView
      style={{
        ...stylesheet.container,
        padding: 20,

        height: '100%',
      }}
      contentContainerStyle={{alignItems: 'center'}}>
      <AppLogo context={IAppLogoContext.LOGIN} />

      <View style={{width: '100%', padding: 10, gap: 40}}>
        <CustomTextInput
          labelText={'Email'}
          onChangeEmit={handleChange}
          name={'email'}
          value={userAuth.email}
        />
        <CustomTextInput
          labelText={'Password'}
          onChangeEmit={handleChange}
          name={'password'}
          value={userAuth.password}
        />
      </View>
      <CustomButton
        text={'Register'}
        style={{marginBottom: 30, marginTop: 10}}
      />
    </ScrollView>
  );
};
