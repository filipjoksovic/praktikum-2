import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Touchable,
  View,
} from 'react-native';
import {STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';
import React, {useEffect} from 'react';
import {AuthService} from '../../../services/AuthService';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {TextInput, Button} from 'react-native-paper';
import {Link, useNavigation} from '@react-navigation/native';
import {LocalStorageService} from '../../../services/LocalStorageService';
export const LoginPage = ({navigation}: any) => {
  const [userAuth, setUserAuth] = React.useState<{
    email: string;
    password: string;
  }>({email: '', password: ''});
  const theme = useTheme();
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
    console.log('submitting form');
    console.log(userAuth);
    // @ts-ignore
    try {
      const result = await AuthService.login(userAuth);
      console.log(result);
      console.log('Navigating home');
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
      <AppLogo context={IAppLogoContext.LOGIN} />

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
        No account? Register <Link to={'/Register'}>here</Link>
      </Text>
    </ScrollView>
  );
};
