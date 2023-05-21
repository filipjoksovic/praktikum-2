import React from 'react';
import {BottomNavigation, useTheme} from 'react-native-paper';
import {AccountSetup} from '../../account/account/pages/AccountSetup';
import {PrepareShoppingListPage} from './PrepareShoppingListPage';
import {ShoppingListsPage} from '../../shopping-lists/pages/ShoppingListsPage';
import {AuthService} from '../../../services/AuthService';
import {useFocusEffect} from '@react-navigation/native';
import {SettingsPage} from '../../settings/pages/SettingsPage';

export const HomePage = ({navigation}) => {
  const theme = useTheme();
  useFocusEffect(() => {
    async function doesUserExist() {
      try {
        await AuthService.checkIfExists();
      } catch (e) {
        navigation.navigate('Login');
      }
    }
    doesUserExist();
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
    {
      key: 'shoppingLists',
      title: 'Shopping Lists',
      focusedIcon: 'format-list-bulleted-square',
      unfocusedIcon: 'format-list-checkbox',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: PrepareShoppingListPage,
    notifications: AccountSetup,
    shoppingLists: ShoppingListsPage,
    settings: SettingsPage,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
