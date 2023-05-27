import React from 'react';
import {BottomNavigation, useTheme} from 'react-native-paper';
import {AccountSetup} from '../../account/account/pages/AccountSetup';
import {PrepareShoppingListPage} from './PrepareShoppingListPage';
import {ShoppingListsPage} from '../../shopping-lists/pages/ShoppingListsPage';
import {AuthService} from '../../../services/AuthService';
import {useFocusEffect} from '@react-navigation/native';
import {SettingsPage} from '../../settings/pages/SettingsPage';
import {TabNavigation} from '../../../App';

export const HomePage = ({navigation}) => {
  const theme = useTheme();
  useFocusEffect(() => {
    async function doesUserExist() {
      try {
        await AuthService.checkIfExists();
      } catch (e) {
        console.log('[HomePage]: Error occured. Sending to login', e);
        navigation.navigate('Login');
      }
    }
    const exists = doesUserExist();
  });

  return <TabNavigation></TabNavigation>;
};
