import {SafeAreaView, ToastAndroid} from 'react-native';
import {INPUTS, LAYOUT, TYPO} from '../../../resources/styles/STYLESHEET';
import {CustomButton} from '../../shared/components/CustomButton';
import React, {useState} from 'react';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {CreateShoppingListPage} from './CreateShoppingListPage';
import {BottomNavigation, useTheme} from 'react-native-paper';
import {Text, TextInput, Button} from 'react-native-paper';
import {LoginPage} from '../../auth/pages/LoginPage';
import {RegisterPage} from '../../auth/pages/RegisterPage';
import {AccountSetup} from '../../account/account/pages/AccountSetup';
import {PrepareShoppingListPage} from './PrepareShoppingListPage';

export const HomePage = () => {
  const theme = useTheme();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'notifications',
      title: 'Notifications',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: PrepareShoppingListPage,
    notifications: AccountSetup,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
