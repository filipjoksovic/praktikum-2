import {View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React from 'react';
import {AuthService} from '../../../services/AuthService';
import {AccountSetup} from '../../account/account/pages/AccountSetup';
import {FamilyPage} from '../../family/pages/FamilyPage';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const AccountIcon = props => <Avatar.Icon {...props} icon="account" />;
const AccountsIcon = props => <Avatar.Icon {...props} icon="family-tree" />;

const SettingsStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SetupElse" component={AccountSetup} />
      <Stack.Screen name="Family" component={FamilyPage} />
    </Stack.Navigator>
  );
};

export const SettingsPage = ({navigation}) => {
  const theme = useTheme();

  const logout = async () => {
    try {
      await AuthService.logout();
      navigation.navigate('Login');
    } catch (e) {
      console.log('[SettingsPage]: Error occurred when logging out', e);
    }
  };
  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
      }}>
      <Text variant={'headlineLarge'} style={{marginBottom: 20}}>
        Settings
      </Text>
      <Card onPress={() => {}}>
        <Card.Title
          title="Account"
          subtitle="Customize your account"
          left={AccountIcon}
        />
      </Card>
      <Card style={{marginTop: 10}} onPress={() => {}}>
        <Card.Title
          title="Family"
          subtitle="See details about your family, add or remove members."
          left={AccountsIcon}
        />
      </Card>
      <Surface>
        <Button
          onPress={() => {
            navigation.navigate('Settings', {screen: 'Family'});
          }}>
          Family
        </Button>
      </Surface>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};
