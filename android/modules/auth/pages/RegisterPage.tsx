import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';
import React, {useState} from 'react';
import {UserAuthDTO} from '../../../models/UserAuthDTO';
import {AuthService} from '../../../services/AuthService';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {Link} from '@react-navigation/native';

export const RegisterPage = ({navigation}: any) => {
  const theme = useTheme();
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
  const setEmail = (value: string) => {
    setUserAuth(prevState => {
      return {...prevState, email: value};
    });
  };
  const setPassword = (value: string) => {
    setUserAuth(prevState => {
      return {...prevState, password: value};
    });
  };

  return (
    <ScrollView
      style={{
        ...stylesheet.container,
        backgroundColor: theme.colors.background,
        padding: 20,

        height: '100%',
      }}
      contentContainerStyle={{alignItems: 'center'}}>
      <AppLogo context={IAppLogoContext.REGISTER} />

      <View style={{width: '100%', padding: 10, gap: 40}}>
        <TextInput
          mode={'outlined'}
          label={'Email'}
          value={userAuth.email}
          onChangeText={setEmail}
        />
        <TextInput
          mode={'outlined'}
          label={'Password'}
          onChangeText={setPassword}
        />
      </View>

      <Button
        mode={'contained'}
        compact={false}
        rippleColor={'red'}
        onPress={submitForm}>
        Log in
      </Button>

      <Text style={{marginTop: 20}}>
        Already have an account? Login <Link to={'/Login'}>here</Link>
      </Text>
    </ScrollView>
  );
};
