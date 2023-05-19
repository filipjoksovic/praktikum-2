import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';
import React from 'react';
import {AuthService} from '../../../services/AuthService';

export const LoginPage = ({navigation}: any) => {
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
    setUserAuth(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitForm = async () => {
    // @ts-ignore
    try {
      //TODO handle result storage
      const result = await AuthService.login(userAuth);
      console.log(result);
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
      <AppLogo context={IAppLogoContext.LOGIN} />

      <View style={{width: '100%', padding: 10, gap: 40}}>
        <CustomTextInput
          labelText={'Email'}
          onChangeEmit={handleChange}
          name={'email'}
          value={userAuth.email}
          autoCapitalize={'none'}
          textContentType={'emailAddress'}
        />
        <CustomTextInput
          labelText={'Password'}
          onChangeEmit={handleChange}
          name={'password'}
          value={userAuth.password}
          autoCapitalize={'none'}
          textContentType={'password'}
        />
      </View>
      <CustomButton
        text={'Login'}
        onPressHandler={submitForm}
        style={{marginBottom: 30, marginTop: 10}}
      />
    </ScrollView>
  );
};
