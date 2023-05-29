import React from 'react';
import {BottomNavigation, Snackbar, useTheme} from 'react-native-paper';
import {AuthService} from '../../../services/AuthService';
import {useFocusEffect} from '@react-navigation/native';
import {TabNavigation} from '../../../App';
import {View} from 'react-native';

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
    doesUserExist();
  });

  return <TabNavigation></TabNavigation>;
};
