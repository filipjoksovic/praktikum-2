import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {STYLESHEET, TYPO} from '../../resources/styles/STYLESHEET';

export enum IAppLogoContext {
  LOGIN = 'Login',
  REGISTER = 'Register',
}
export interface IAppLogoProps {
  context: IAppLogoContext;
}

export const AppLogo = (props: IAppLogoProps) => {
  const {context} = props;

  const stylesheet = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
      backgroundColor: STYLESHEET.colors.accent,
      borderRadius: 100,
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
    },
  });
  return (
    <SafeAreaView style={{alignItems: 'center', marginBottom: 50}}>
      <View style={{...stylesheet.logo}}>
        <Image
          style={stylesheet.image}
          source={require('../../resources/app-logo.png')}
        />
      </View>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{...TYPO.heading_one, ...TYPO.bold}}>WishList</Text>
        <Text style={{...TYPO.heading_three, ...TYPO.medium}}>
          {' '}
          - {context}
        </Text>
      </View>
    </SafeAreaView>
  );
};
