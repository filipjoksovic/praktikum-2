import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BUTTONS, STYLESHEET} from '../../../resources/styles/STYLESHEET';
import {AppLogo, IAppLogoContext} from '../../shared/AppLogo';
import {CustomTextInput} from '../../shared/components/CustomTextInput';

export const LoginPage = () => {
  const stylesheet = StyleSheet.create({
    container: {
      height: 100,
      padding: 30,
      backgroundColor: 'transparent',
      color: STYLESHEET.colors.text_light,
    },
    text: {
      color: STYLESHEET.colors.text_light,
    },
  });

  return (
    <ScrollView
      style={stylesheet.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <AppLogo context={IAppLogoContext.LOGIN} />

      <View style={{width: '100%', gap: 40, backgroundColor: 'transparent'}}>
        <CustomTextInput labelText={'Email'} />
        <CustomTextInput labelText={'Password'} />
      </View>
      <Pressable style={{...BUTTONS.primary, marginTop: 30}}>
        <Text style={BUTTONS.primary.text}>Press me</Text>
      </Pressable>
    </ScrollView>
  );
};
