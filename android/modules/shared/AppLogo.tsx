import {Image, StyleSheet, View} from 'react-native';
import {STYLESHEET, TYPO} from '../../resources/styles/STYLESHEET';
import {useTheme, Text, Avatar} from 'react-native-paper';

export enum IAppLogoContext {
  LOGIN = 'Login',
  REGISTER = 'Register',
}
export interface IAppLogoProps {
  context: IAppLogoContext;
}

export const AppLogo = (props: IAppLogoProps) => {
  const {context} = props;
  const theme = useTheme();

  const stylesheet = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
      borderRadius: 100,
      padding: 20,
    },
    image: {
      width: 150,
      height: 150,
    },
  });
  return (
    <View style={{alignItems: 'center', marginBottom: 50}}>
      <Avatar.Image
        size={200}
        style={{marginVertical: 20}}
        source={require('../../resources/app-logo.png')}
      />
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
        <Text variant={'displayMedium'}>WishList</Text>
        <Text variant={'displaySmall'}> - {context}</Text>
      </View>
    </View>
  );
};
