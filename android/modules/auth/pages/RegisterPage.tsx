import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BUTTONS, STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';
import {CustomButton} from '../../shared/components/CustomButton';

export const RegisterPage = () => {
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
        <CustomTextInput labelText={'Email'} />
        <CustomTextInput labelText={'Password'} />
      </View>
      <CustomButton
        text={'Register'}
        style={{marginBottom: 30, marginTop: 10}}
      />
    </ScrollView>
  );
};
