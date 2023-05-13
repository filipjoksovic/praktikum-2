import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';
import React, {useState} from 'react';
import {UserAuthDTO} from '../../../models/UserAuthDTO';
import {AuthService} from '../../../services/AuthService';

export const RegisterPage = ({navigation}: any) => {
  const [userAuth, setUserAuth] = useState<UserAuthDTO>({
    email: '',
    password: '',
  });
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
    setUserAuth(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitForm = async () => {
    try {
      const result = await AuthService.register(userAuth);
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        ToastAndroid.CENTER;
        ToastAndroid.showWithGravity(error.message, 1000, ToastAndroid.TOP);
      }
    }
  };

  return (
    <ScrollView
      style={{
        ...stylesheet.container,
        padding: 20,

        height: '100%',
      }}
      contentContainerStyle={{alignItems: 'center'}}>
      <AppLogo context={IAppLogoContext.REGISTER} />

      <View style={{width: '100%', padding: 10, gap: 40}}>
        <CustomTextInput
          labelText={'Email'}
          textContentType={'emailAddress'}
          value={userAuth.email}
          onChangeEmit={handleChange}
          name={'email'}
        />
        <CustomTextInput
          labelText={'Password'}
          textContentType={'password'}
          value={userAuth.password}
          onChangeEmit={handleChange}
          name={'password'}
        />
      </View>
      <CustomButton
        text={'Register'}
        style={{marginBottom: 30, marginTop: 10}}
        onPressHandler={submitForm}
      />
    </ScrollView>
  );
};
