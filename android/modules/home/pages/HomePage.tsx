import {SafeAreaView, Text} from 'react-native';
import {TYPO} from '../../../resources/styles/STYLESHEET';

export const HomePage = () => {
  return (
    <SafeAreaView>
      <Text style={TYPO.heading_four}>Welcome</Text>
    </SafeAreaView>
  );
};
