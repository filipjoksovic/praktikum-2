import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BUTTONS, STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';

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
      }}
      contentContainerStyle={{alignItems: 'center'}}>
      <AppLogo context={IAppLogoContext.REGISTER} />

      <View style={{width: '100%', gap: 40}}>
        <CustomTextInput labelText={'Email'} />
        <CustomTextInput labelText={'Password'} />
      </View>
      <Pressable style={{...BUTTONS.primary, marginTop: 30}}>
        <Text style={BUTTONS.primary.text}>Press me</Text>
      </Pressable>
    </ScrollView>
  );
};
